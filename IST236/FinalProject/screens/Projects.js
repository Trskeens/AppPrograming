import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProjectsScreen = () => {
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);

  const fetchData = async () => {
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
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleDueDateConfirm = (date) => {
    setDueDate(date);
    setDueDatePickerVisibility(false);
  };

  const submitProject = async () => {
    try {
      const newProject = {
        fields: {
          'Name': { stringValue: name },
          'Description': { stringValue: description },
          'Start Date': { timestampValue: startDate.toISOString() },
          'Due Date': { timestampValue: dueDate.toISOString() },
        },
      };
      await axios.post(
        `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects?key=AIzaSyDYIesdlgGskbXHMTh46XPu6jeNd-K2LhE`,
        newProject
      );
      fetchData();
      toggleModal();
    } catch (error) {
      console.error('Error adding new project to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Button title="+" onPress={toggleModal} />
      <View style={styles.scrollViewContainer}>
        <ScrollView>
        {projects.map((project, index) => (
          <View key={index} style={styles.projectContainer}>
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
              return <Text key={key} style={styles.projectText}>{`${key}: ${displayValue}`}</Text>;
            })}
          </View>
        ))}
        </ScrollView>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalLabel}>Name</Text>
          <TextInput style={styles.modalInput} placeholder="Name" onChangeText={setName} />
          <Text style={styles.modalLabel}>Description</Text>
          <TextInput style={styles.modalInput} placeholder="Description" onChangeText={setDescription} />
          <View style={styles.modalButtonContainer}>
            <Button title="Select Start Date" onPress={() => setStartDatePickerVisibility(true)} />
          </View>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={() => setStartDatePickerVisibility(false)}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Select Due Date" onPress={() => setDueDatePickerVisibility(true)} />
          </View>
          <DateTimePickerModal
            isVisible={isDueDatePickerVisible}
            mode="date"
            onConfirm={handleDueDateConfirm}
            onCancel={() => setDueDatePickerVisibility(false)}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Submit" onPress={submitProject} color="green" />
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={toggleModal} color="red" />
          </View>
        </View>
      </Modal>
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
  projectContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 0,
    marginBottom: 10,
    borderRadius: 5,
  },
  projectText: {
    fontSize: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  modalButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ProjectsScreen;