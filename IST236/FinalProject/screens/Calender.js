import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: Encountered two children with the same key']);

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDayProjects, setSelectedDayProjects] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const projectsResult = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects'
      );
      const tasksResult = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks'
      );
  
      const newMarkedDates = {};
  
      if (projectsResult.data.documents) {
        projectsResult.data.documents.forEach(doc => {
          if (doc.fields['isComplete'] && doc.fields['isComplete'].booleanValue) {
            return; // Skip this iteration if the project is complete
          }
          if (doc.fields['Due Date'] && doc.fields['Due Date'].timestampValue && doc.fields['Name'] && doc.fields['Name'].stringValue) {
            const date = new Date(doc.fields['Due Date'].timestampValue).toISOString().split('T')[0];
            newMarkedDates[date] = { 
              dots: [{ 
                key: 'project', 
                color: 'red', 
                name: doc.fields['Name']?.stringValue,
                description: doc.fields['Description']?.stringValue,
                startDate: new Date(doc.fields['Start Date'].timestampValue).toISOString().split('T')[0],
                dueDate: date
              }] 
            };
          }
        });
      }
      
      if (tasksResult.data.documents) {
        tasksResult.data.documents.forEach(doc => {
          if (doc.fields['isComplete'] && doc.fields['isComplete'].booleanValue) {
            return; // Skip this iteration if the task is complete
          }
          if (doc.fields['Due Date'] && doc.fields['Due Date'].timestampValue && doc.fields['Task Name'] && doc.fields['Task Name'].stringValue) {
            const date = new Date(doc.fields['Due Date'].timestampValue).toISOString().split('T')[0];
            if (newMarkedDates[date]) {
              newMarkedDates[date].dots.push({ 
                key: 'task', 
                color: 'blue', 
                name: doc.fields['Task Name']?.stringValue,
                description: doc.fields['Description']?.stringValue,
                dueDate: date,
                priority: doc.fields['Priority']?.stringValue,
                projectName: doc.fields['Project Name']?.stringValue
              });
            } else {
              newMarkedDates[date] = { 
                dots: [{ 
                  key: 'task', 
                  color: 'blue', 
                  name: doc.fields['Task Name']?.stringValue,
                  description: doc.fields['Description']?.stringValue,
                  dueDate: date,
                  priority: doc.fields['Priority']?.stringValue,
                  projectName: doc.fields['Project Name']?.stringValue
                }] 
              };
            }
          }
        });
      }
  
      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {}; 
    }, [fetchData])
  );


const onDayPress = (day) => {
  const date = day.dateString;
  if (markedDates[date]) {
    setSelectedDayProjects(markedDates[date].dots.map(dot => ({
      key: dot.key, 
      color: dot.color, 
      name: dot.name,
      description: dot.description,
      dueDate: dot.dueDate,
      startDate: dot.startDate,
      priority: dot.priority,
      projectName: dot.projectName
    })));
  } else {
    setSelectedDayProjects([]);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <View style={styles.keyContainer}>
        <View style={styles.keyItem}>
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
          <Text style={styles.keyText}>Project Due Date</Text>
        </View>
        <View style={styles.keyItem}>
          <View style={[styles.dot, { backgroundColor: 'blue' }]} />
          <Text style={styles.keyText}>Task Due Date</Text>
        </View>
      </View>
      <Calendar 
        markedDates={markedDates} 
        markingType={'multi-dot'} 
        onDayPress={onDayPress} 
      />
      <ScrollView>
        <View style={styles.selectedDayProjectsContainer}>
          {selectedDayProjects.map((projectOrTask, index) => (
            <View key={index} style={styles.infoContainer}>
              <Text style={[styles.infoText, {color: projectOrTask.color}]}>{projectOrTask.name}</Text>
              <Text style={styles.infoText}>Description: {projectOrTask.description}</Text>
              <Text style={styles.infoText}>Due Date: {new Date(projectOrTask.dueDate).toLocaleString()}</Text>
              {projectOrTask.key === 'project' ? (
                <Text style={styles.infoText}>Start Date: {new Date(projectOrTask.startDate).toLocaleString()}</Text>
              ) : (
                <>
                  <Text style={styles.infoText}>Priority: {projectOrTask.priority}</Text>
                  <Text style={styles.infoText}>Project Name: {projectOrTask.projectName}</Text>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
console.error = (error) => {
  if (error.includes('Warning: Encountered two children with the same key')) {
    return;
  }
  const originalConsoleError = console._errorOriginal || console.error;
  originalConsoleError(error);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  keyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  keyText: {
    fontSize: 16,
  },
  selectedDayProjectsContainer: {
    marginTop: 20,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectText: {
    marginLeft: 10,
    fontSize: 16,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#4e4949',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  infoText: {
    fontFamily: 'nolluqa',
    fontSize:20, 
    lineHeight: 15, 
    marginBottom: 8, 
    color: 'white',
  },
});

export default CalendarScreen;