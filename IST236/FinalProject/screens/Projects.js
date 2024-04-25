import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
  const [isProjectModalVisible, setProjectModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStartDate, setEditStartDate] = useState(new Date());
  const [editDueDate, setEditDueDate] = useState(new Date());
  const [isEditStartDatePickerVisible, setEditStartDatePickerVisibility] = useState(false);
  const [isEditDueDatePickerVisible, setEditDueDatePickerVisibility] = useState(false);
  const [isEditProjectModalVisible, setEditProjectModalVisible] = useState(false);
  const [editIsComplete, setEditIsComplete] = useState(false);


  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects'
      );
      if (result.data.documents) {
        setProjects(result.data.documents.map(doc => ({ id: doc.name.split('/').pop(), ...doc.fields })));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const markProjectAsComplete = async (projectId) => {
    if (!projectId) {
      console.error('Error: projectId is undefined');
      return;
    }
  
    try {
      const projectResponse = await axios.get(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${projectId}`);
      const currentProject = projectResponse.data;
  
      const updatedProject = {
        ...currentProject,
        fields: {
          ...currentProject.fields,
          isComplete: { booleanValue: true },
        },
      };
  
      const requestPayload = { fields: updatedProject.fields };
  
      await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${projectId}`,
        data: requestPayload,
      });
  
      fetchData();
    } catch (error) {
      console.error('Error marking project as complete in Firestore:', error);
    }
  };

  const markProjectAsActive = async (projectId) => {
    if (!projectId) {
      console.error('Error: projectId is undefined');
      return;
    }
  
    try {
      const projectResponse = await axios.get(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${projectId}`);
      const currentProject = projectResponse.data;
  
      const updatedProject = {
        ...currentProject,
        fields: {
          ...currentProject.fields,
          isComplete: { booleanValue: false },
        },
      };
  
      const requestPayload = { fields: updatedProject.fields };
  
      await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${projectId}`,
        data: requestPayload,
      });
  
      fetchData();
    } catch (error) {
      console.error('Error marking project as active in Firestore:', error);
    }
  };

  const deleteProject = async (projectId) => {
    if (!projectId) {
      console.error('Error: projectId is undefined');
      return;
    }
  
    try {
      await axios.delete(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${projectId}`);
      fetchData();
      toggleProjectModal(null);
    } catch (error) {
      console.error('Error deleting project from Firestore:', error);
    }
  };

  const toggleProjectModal = () => {
    setProjectModalVisible(!isProjectModalVisible);
  };

  const openEditProjectModal = (project) => {
    setSelectedProject(project);
    setEditName(project.Name.stringValue);
    setEditDescription(project.Description.stringValue);
    setEditStartDate(new Date(project['Start Date'].timestampValue));
    setEditDueDate(new Date(project['Due Date'].timestampValue));
    setEditIsComplete(project.isComplete.booleanValue); // Add this line
    setEditProjectModalVisible(true);
  };

  const toggleEditProjectModal = () => {
    setEditProjectModalVisible(!isEditProjectModalVisible);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    toggleProjectModal();
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

  const handleEditStartDateConfirm = (date) => {
    setEditStartDate(date);
    setEditStartDatePickerVisibility(false);
  };

  const handleEditDueDateConfirm = (date) => {
    setEditDueDate(date);
    setEditDueDatePickerVisibility(false);
  };

  const submitProject = async () => {
    try {
      const newProject = {
        fields: {
          'Name': { stringValue: name },
          'Description': { stringValue: description },
          'Start Date': { timestampValue: startDate.toISOString() },
          'Due Date': { timestampValue: dueDate.toISOString() },
          'isComplete': { booleanValue: false },
        },
      };
      await axios.post(
        `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects?key=YOUR_API_KEY`,
        newProject
      );
      fetchData();
      toggleModal();
    } catch (error) {
      console.error('Error adding new project to Firestore:', error);
    }
  };

  const submitEditedProject = async () => {
    // Get the current value of isComplete
    const currentIsComplete = selectedProject && selectedProject.fields && selectedProject.fields['isComplete'] && selectedProject.fields['isComplete'].booleanValue !== undefined ? selectedProject.fields['isComplete'].booleanValue : false;  
  
  
    // Construct the updated project object
    const updatedProject = {
      fields: {
        'Name': { stringValue: editName },
        'Description': { stringValue: editDescription },
        'Start Date': { timestampValue: editStartDate.toISOString() },
        'Due Date': { timestampValue: editDueDate.toISOString() },
        'isComplete': { booleanValue: editIsComplete }, // Use editIsComplete instead of currentIsComplete
      },
    };
  
  
    try {
      await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects/${selectedProject.id}`,
        data: updatedProject,
      });
      fetchData();
      setEditProjectModalVisible(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Button title="+" onPress={toggleModal} />
      <View style={{ marginBottom: 20 }} />
      <ScrollView>
        {projects.map((project, index) => (
          <TouchableOpacity key={index} onPress={() => handleProjectClick(project)}>
            <View style={[
              styles.projectContainer,
              { padding: 10 }, // Add padding here
              project.isComplete && project.isComplete.booleanValue && { backgroundColor: 'rgba(78, 73, 73, 0.65)' },
              (!project.isComplete || !project.isComplete.booleanValue) && { backgroundColor: '#4e4949' }
            ]}>
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
                return <Text key={key} style={[styles.projectText, {color: 'white'}]}>{`${key}: ${displayValue}`}</Text>;
              })}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
      <Modal isVisible={isProjectModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Project Details</Text>
          <View style={styles.modalContent}>
            {selectedProject && ['Name', 'Start Date', 'Due Date', 'Description'].map(key => {
              const value = selectedProject[key];
              let displayValue = 'N/A';
              if (value && value.stringValue) {
                displayValue = value.stringValue;
              } else if (value && value.timestampValue) {
                const date = new Date(value.timestampValue);
                displayValue = date.toLocaleDateString();
              }
              return (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{`${key}:`}</Text>
                  <Text style={styles.detailValue}>{displayValue}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => openEditProjectModal(selectedProject)} color="orange" />
            <View style={{ marginBottom: 10 }} />
            {selectedProject && (
              <>
                {selectedProject.isComplete && selectedProject.isComplete.booleanValue ? (
                  <Button title="Mark as Active" onPress={() => markProjectAsActive(selectedProject.id)} color="blue" />
                ) : (
                  <Button title="Mark as Complete" onPress={() => markProjectAsComplete(selectedProject.id)} color="blue" />
                )}
              </>
            )}
            <View style={{ marginBottom: 10 }} />
            <Button title="Delete" onPress={() => deleteProject(selectedProject.id)} color="red" />
            <View style={{ marginBottom: 10 }} />
            <Button title="Close" onPress={() => toggleProjectModal(null)} color="green" />
          </View>
        </View>
      </Modal>
      <Modal isVisible={isEditProjectModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalLabel}>Name</Text>
          <TextInput style={styles.modalInput} value={editName} onChangeText={setEditName} />
          <Text style={styles.modalLabel}>Description</Text>
          <TextInput style={styles.modalInput} value={editDescription} onChangeText={setEditDescription} />
          <View style={styles.modalButtonContainer}>
            <Button title="Select Start Date" onPress={() => setEditStartDatePickerVisibility(true)} />
          </View>
          <DateTimePickerModal
            isVisible={isEditStartDatePickerVisible}
            mode="date"
            onConfirm={handleEditStartDateConfirm}
            onCancel={() => setEditStartDatePickerVisibility(false)}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Select Due Date" onPress={() => setEditDueDatePickerVisibility(true)} />
          </View>
          <DateTimePickerModal
            isVisible={isEditDueDatePickerVisible}
            mode="date"
            onConfirm={handleEditDueDateConfirm}
            onCancel={() => setEditDueDatePickerVisibility(false)}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Submit" onPress={submitEditedProject} color="green" />
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={toggleEditProjectModal} color="red" />
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
    backgroundColor: '#4e4949',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 22,
    fontFamily: 'nolluqa',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    marginTop: 20, 
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailValue: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
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
  projectContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 0,
    marginBottom: 10,
    borderRadius: 5,
  },
  projectText: {
    fontSize: 22,
    fontFamily: 'nolluqa', 
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
  },
});

export default ProjectsScreen;