import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDayProjects, setSelectedDayProjects] = useState([]);

  const fetchData = async () => {
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
          if (doc.fields['Due Date'] && doc.fields['Due Date'].timestampValue && doc.fields['Name'] && doc.fields['Name'].stringValue) {
            const date = new Date(doc.fields['Due Date'].timestampValue).toISOString().split('T')[0];
            console.log('Project Due Date:', date);
            newMarkedDates[date] = { 
              dots: [{ 
                key: 'project', 
                color: 'red', 
                name: doc.fields['Name'].stringValue,
                description: doc.fields['Description'].stringValue,
                startDate: new Date(doc.fields['Start Date'].timestampValue).toISOString().split('T')[0],
                dueDate: date
              }] 
            };
          }
        });
      }
      
      if (tasksResult.data.documents) {
        tasksResult.data.documents.forEach(doc => {
          if (doc.fields['Due Date'] && doc.fields['Due Date'].timestampValue && doc.fields['Task Name'] && doc.fields['Task Name'].stringValue) {
            const date = new Date(doc.fields['Due Date'].timestampValue).toISOString().split('T')[0];
            console.log('Task Due Date:', date);
            if (newMarkedDates[date]) {
              newMarkedDates[date].dots.push({ 
                key: 'task', 
                color: 'blue', 
                name: doc.fields['Task Name'].stringValue,
                description: doc.fields['Description'].stringValue,
                dueDate: date,
                priority: doc.fields['Priority'].stringValue,
                projectId: doc.fields['ProjectsID'].stringValue
              });
            } else {
              newMarkedDates[date] = { 
                dots: [{ 
                  key: 'task', 
                  color: 'blue', 
                  name: doc.fields['Task Name'].stringValue,
                  description: doc.fields['Description'].stringValue,
                  dueDate: date,
                  priority: doc.fields['Priority'].stringValue,
                  projectId: doc.fields['ProjectsID'].stringValue
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
  };

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
      projectId: dot.projectId
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
      <Text style={styles.title}>Calendar Screen</Text>
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
      <View style={styles.selectedDayProjectsContainer}>
        {selectedDayProjects.map((projectOrTask, index) => (
            <View key={index} style={styles.infoContainer}>
            <Text style={{color: projectOrTask.color}}>{projectOrTask.name}</Text>
            <Text>Description: {projectOrTask.description}</Text>
            <Text>Due Date: {new Date(projectOrTask.dueDate).toLocaleString()}</Text>
            {projectOrTask.key === 'project' ? (
                <Text>Start Date: {new Date(projectOrTask.startDate).toLocaleString()}</Text>
            ) : (
                <>
                <Text>Priority: {projectOrTask.priority}</Text>
                <Text>Project ID: {projectOrTask.projectId}</Text>
                </>
            )}
            </View>
        ))}
        </View>
    </View>
  );
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CalendarScreen;