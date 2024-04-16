import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('Low');
  const [projectId, setProjectId] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks'
      );
      if (result.data.documents) {
        setTasks(result.data.documents.map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects'
      );
      if (result.data.documents) {
        setProjects(result.data.documents.map(doc => doc.fields));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);

  const toggleModal = () => {
    if (isModalVisible) {
      // Reset the state when the modal is closed
      setTaskName('');
      setDescription('');
      setDueDate(new Date());
      setPriority('Low');
      setProjectId('');
    }
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = (date) => {
    setDueDate(date);
    setDatePickerVisibility(false);
  };

  const submitTask = async () => {
    try {
      const newTask = {
        fields: {
          'Task Name': { stringValue: taskName },
          Description: { stringValue: description },
          'Due Date': { timestampValue: dueDate.toISOString() },
          Priority: { stringValue: priority },
          ProjectsID: { stringValue: projectId },
        },
      };
      await axios.post(
        `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks?key=AIzaSyDYIesdlgGskbXHMTh46XPu6jeNd-K2LhE`,
        newTask
      );
      fetchData();
      toggleModal();
    } catch (error) {
      console.error('Error adding new task to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks Screen</Text>
      <Button title="+" onPress={toggleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.label}>Task Name</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Task Name" onChangeText={setTaskName} />
          </View>
          <Text style={styles.label}>Description</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Description" onChangeText={setDescription} />
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Select Due Date" onPress={() => setDatePickerVisibility(true)} />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <View style={styles.pickerContainer}>
            <Picker selectedValue={priority} onValueChange={setPriority}>
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Urgent" value="Urgent" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={projectId} onValueChange={setProjectId}>
              {projects.map((project, index) => {
                return (
                  <Picker.Item key={index} label={project['Name'].stringValue || ''} value={project['ProjectsID'] || ''} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Submit" onPress={submitTask} color="green" />
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={toggleModal} color="red" />
          </View>
        </View>
      </Modal>
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskContainer}>
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
                return <Text key={key} style={styles.taskText}>{`${key}: ${displayValue}`}</Text>;
              })}
            </View>
          ))}
        </ScrollView>
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
  scrollViewContainer: {
    marginTop: 20,
    width: '100%',
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TasksScreen;