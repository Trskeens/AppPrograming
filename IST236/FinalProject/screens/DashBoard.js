import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects'
      );
      if (result.data.documents) {
        setProjects(result.data.documents.slice(0, 3).map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Projects</Text>
      {projects.map((project, index) => (
        <View key={index} style={styles.itemContainer}>
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
        </View>
      ))}
    </View>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks'
      );
      if (result.data.documents) {
        setTasks(result.data.documents.slice(0, 3).map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Tasks</Text>
      {tasks.map((task, index) => (
        <View key={index} style={styles.itemContainer}>
          {['ProjectsID', 'Task Name', 'Priority', 'Due Date', 'Description'].map(key => {
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
    },
    listContainer: {
      marginTop: 20,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    itemContainer: {
      borderWidth: 1,
      borderColor: '#000',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    itemText: {
      fontSize: 16,
    },
  });

export default DashboardScreen;