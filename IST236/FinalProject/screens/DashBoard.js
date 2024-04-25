import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const ProjectList = () => {
  const isFocused = useIsFocused();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks'
      );
      if (result.data.documents) {
        setTasks(result.data.documents.map(doc => doc.fields));
      } else {
        console.log('No tasks returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching tasks from Firestore:', error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects'
      );
      if (result.data.documents) {
        const filteredProjects = result.data.documents.filter(doc => !doc.fields['isComplete'] || !doc.fields['isComplete'].booleanValue);
        setProjects(filteredProjects.slice(0, 3).map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
      fetchTasks();
    }
  }, [isFocused]);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Projects</Text>
      {projects.map((project, index) => {
        const projectTasks = tasks.filter(task => task['Project Name'].stringValue === project['Name'].stringValue);
        const completedTasks = projectTasks.filter(task => task['isComplete'] && task['isComplete'].booleanValue);
        const progress = projectTasks.length > 0 ? completedTasks.length / projectTasks.length : 0;

        return (
          <View 
            key={index} 
            style={[
              styles.itemContainer, 
              project['isComplete'] && project['isComplete'].booleanValue ? styles.completed : {}
            ]}
          >
            {['Name', 'Start Date', 'Due Date', 'Description'].map(key => {
              const value = project[key];
              let displayValue;
              if (value && (key === 'Start Date' || key === 'Due Date') && value.timestampValue) {
                const date = new Date(value.timestampValue);
                displayValue = date.toLocaleDateString();
              } else if (value && value.stringValue) {
                displayValue = value.stringValue;
              } else {
                displayValue = 'N/A';
              }
              return <Text key={key} style={styles.itemText}>{`${key}: ${displayValue}`}</Text>;
            })}
            <ProgressBar progress={progress} style={{height: 10}} />
            <Text style={{textAlign: 'center'}}>{Math.round(progress * 100)}%</Text>
          </View>
        );
      })}
    </View>
  );
};

const TaskList = () => {
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks'
      );
      if (result.data.documents) {
        const filteredTasks = result.data.documents.filter(doc => !doc.fields['isComplete'] || !doc.fields['isComplete'].booleanValue);
        setTasks(filteredTasks.slice(0, 3).map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Tasks</Text>
      {tasks.map((task, index) => (
        <View 
          key={index} 
          style={[
            styles.itemContainer, 
            task['isComplete'] && task['isComplete'].booleanValue ? styles.completed : {}
          ]}
        >
          {['Project Name', 'Task Name', 'Priority', 'Due Date', 'Description'].map(key => {
            const value = task[key];
            let displayValue;
            if (value && (key === 'Due Date') && value.timestampValue) {
              const date = new Date(value.timestampValue);
              displayValue = date.toLocaleDateString();
            } else if (value && value.stringValue) {
              displayValue = value.stringValue;
            } else {
              displayValue = 'N/A';
            }
            return <Text key={key} style={styles.itemText}>{`${key}: ${displayValue}`}</Text>;
          })}
        </View>
      ))}
    </View>
  );
};

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Dashboard</Text>
        <ProjectList />
        <TaskList />
      </ScrollView>
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  contentContainer: {
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'playfair', // apply the font to the title
  },
  listContainer: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'playfair', // apply the font to the list title
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#4e4949',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 22,
    fontFamily: 'nolluqa', // apply the font to the item text
    color: '#fff',
  },
  completed: {
    backgroundColor: 'lightgrey',
    opacity: 0.5,
  },
});
export default DashboardScreen;