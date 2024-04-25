import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
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
  const [projectName, setProjectName] = useState(''); 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 
  const [isTaskModalVisible, setTaskModalVisible] = useState(false); 
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editTaskName, setEditTaskName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [isEditDatePickerVisible, setEditDatePickerVisibility] = useState(false);
  const handleEditConfirm = (date) => {
    setDueDate(date);
    setEditDatePickerVisibility(false);
  };
  const [editPriority, setEditPriority] = useState('Low');



  const fetchData = async () => {
    try {
      const result = await axios.get('https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks');
      if (result.data.documents) {
        setTasks(result.data.documents.map(doc => ({ id: doc.name.split('/').pop(), ...doc.fields })));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const result = await axios.get('https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Projects');
      if (result.data.documents) {
        setProjects(result.data.documents.map(doc => ({ name: doc.fields['Name'].stringValue })));
      } else {
        console.log('No documents returned from Firestore');
      }
    } catch (error) {
      console.error('Error fetching projects from Firestore:', error);
    }
  };

  const markTaskAsComplete = async (taskId) => {
    if (!taskId) {
      console.error('Error: taskId is undefined');
      return;
    }
  
    try {
      // Fetch the current task document from Firestore
      const taskResponse = await axios.get(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${taskId}`);
      const currentTask = taskResponse.data;
  
      // Create an updated task object with the existing fields and the updated isComplete field
      const updatedTask = {
        ...currentTask,
        fields: {
          ...currentTask.fields,
          isComplete: { booleanValue: true },
        },
      };
  
      // Construct the request payload
      const requestPayload = { fields: updatedTask.fields };
  
      // Send the PATCH request to Firestore without the updateMask parameter
      const response = await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${taskId}`,
        data: requestPayload,
      });
  
      // Refresh the task data after marking the task as complete
      fetchData();
    } catch (error) {
      console.error('Error marking task as complete in Firestore:', error.response.data);
    }
  };
  
  const markTaskAsActive = async (taskId) => {
    if (!taskId) {
      console.error('Error: taskId is undefined');
      return;
    }
  
    try {
      // Fetch the current task document from Firestore
      const taskResponse = await axios.get(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${taskId}`);
      const currentTask = taskResponse.data;
  
      // Create an updated task object with the existing fields and the updated isComplete field
      const updatedTask = {
        ...currentTask,
        fields: {
          ...currentTask.fields,
          isComplete: { booleanValue: false },
        },
      };
  
      // Construct the request payload
      const requestPayload = { fields: updatedTask.fields };
  
      // Send the PATCH request to Firestore without the updateMask parameter
      await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${taskId}`,
        data: requestPayload,
      });
  
      // Refresh the task data after marking the task as active
      fetchData();
    } catch (error) {
      console.error('Error marking task as active in Firestore:', error.response.data);
    }
  };
  

  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setTaskName('');
      setDescription('');
      setDueDate(new Date());
      setPriority('Low');
      setProjectName('');
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditTaskName(task['Task Name'].stringValue);
    setEditDescription(task.Description.stringValue);
    setEditProjectName(task['Project Name'].stringValue);
    setEditPriority(task.Priority.stringValue);
    setEditModalVisible(true);
  };
  

  const submitEditedTask = async () => {
    // Fetch the latest data
    await fetchData();
  
    // Check if the project name exists
    const matchingProject = projects.find(p => p.name.toLowerCase() === editProjectName.toLowerCase());
    if (!matchingProject) {
      alert('No matching project found. Please enter a valid project name.');
      return;
    }
  
    const updatedTask = {
      fields: {
        'Task Name': { stringValue: editTaskName },
        Description: { stringValue: editDescription },
        'Due Date': { timestampValue: dueDate.toISOString() },
        Priority: { stringValue: editPriority },
        'Project Name': { stringValue: editProjectName },
        isComplete: selectedTask.isComplete,
      },
    };
    try {
      await axios({
        method: 'patch',
        url: `https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${selectedTask.id}`,
        data: updatedTask,
      });
      // Refresh the task data after editing
      fetchData();
      // Close the edit modal
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleConfirm = (date) => {
    setDueDate(date);
    setDatePickerVisibility(false);
  };

  const toggleTaskModal = (task) => {
    setSelectedTask(task);
    setTaskModalVisible(!isTaskModalVisible);
  };

  const deleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Error: taskId is undefined');
      return;
    }
  
    try {
      await axios.delete(`https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks/${taskId}`);
      fetchData();
      toggleTaskModal(null);
    } catch (error) {
      console.error('Error deleting task from Firestore:', error);
    }
  };

  const submitTask = async () => {
    // Fetch the latest data
    await fetchData();
  
    // Check if the project name exists
    const matchingProject = projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
    if (!matchingProject) {
      alert('No matching project found. Please enter a valid project name.');
      return;
    }

    try {
      const newTask = {
        fields: {
          'Task Name': { stringValue: taskName },
          Description: { stringValue: description },
          'Due Date': { timestampValue: dueDate.toISOString() },
          Priority: { stringValue: priority },
          'Project Name': { stringValue: projectName }, // Using the project name instead of ProjectsID
          isComplete: { booleanValue: false },
        },
      };
      await axios.post('https://firestore.googleapis.com/v1/projects/lira-b88da/databases/(default)/documents/Tasks', newTask);
      fetchData();
      toggleModal();
    } catch (error) {
      console.error('Error adding new task to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <Button title="+" onPress={toggleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput style={styles.inputContainer} placeholder="Task Name" value={taskName} onChangeText={setTaskName} />
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.inputContainer} placeholder="Description" value={description} onChangeText={setDescription} />
          <Text style={styles.label}>Project Name</Text>
          <TextInput style={styles.inputContainer} placeholder="Enter Project Name" value={projectName} onChangeText={setProjectName} />
          <Button title="Select Due Date" onPress={() => setDatePickerVisibility(true)} />
          <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)} />
          <Text style={styles.label}>Priority</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={priority} onValueChange={itemValue => setPriority(itemValue)}>
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Urgent" value="Urgent" />
            </Picker>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button title="Submit" onPress={submitTask} color="green" />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button title="Cancel" onPress={toggleModal} color="red" />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.scrollViewContainer}>
        {tasks.map((task, index) => (
          <TouchableOpacity key={index} onPress={() => toggleTaskModal(task)}>
            <View style={[styles.taskContainer, task.isComplete && task.isComplete.booleanValue ? {     backgroundColor: '#4e4949', opacity: 0.65 } : {}]}>
              {['Project Name', 'Task Name', 'Priority', 'Due Date', 'Description'].map(key => {
                const value = task[key];
                let displayValue = 'N/A';
                if (value && value.stringValue) {
                  displayValue = value.stringValue;
                } else if (value && value.timestampValue) {
                  const date = new Date(value.timestampValue);
                  displayValue = date.toLocaleDateString();
                }
                return <Text key={key} style={styles.taskText}>{`${key}: ${displayValue}`}</Text>;
              })}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal isVisible={isTaskModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Task Details</Text>
          <View style={styles.modalContent}>
            {selectedTask && ['Project Name', 'Task Name', 'Priority', 'Due Date', 'Description'].map(key => {
              const value = selectedTask[key];
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
            <Button title="Edit" onPress={() => openEditModal(selectedTask)} color="orange" />
            <View style={{ marginBottom: 10 }} />
            {selectedTask && (
              <>
                {selectedTask.isComplete && selectedTask.isComplete.booleanValue ? (
                  <Button title="Mark as Active" onPress={() => markTaskAsActive(selectedTask.id)} color="blue" />
                ) : (
                  <Button title="Mark as Complete" onPress={() => markTaskAsComplete(selectedTask.id)} color="blue" />
                )}
              </>
            )}
            <View style={{ marginBottom: 10 }} />
            <Button title="Delete" onPress={() => deleteTask(selectedTask.id)} color="red" />
            <View style={{ marginBottom: 10 }} />
            <Button title="Close" onPress={() => toggleTaskModal(null)} color="green" />
          </View>
        </View>
      </Modal>
      <Modal isVisible={isEditModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput style={styles.inputContainer} placeholder="Task Name" value={editTaskName} onChangeText={setEditTaskName} />
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.inputContainer} placeholder="Description" value={editDescription} onChangeText={setEditDescription} />
          <Text style={styles.label}>Project Name</Text>
          <TextInput style={styles.inputContainer} placeholder="Enter Project Name" value={editProjectName} onChangeText={setEditProjectName} />
          <Button title="Select Due Date" onPress={() => setEditDatePickerVisibility(true)} />
          <DateTimePickerModal isVisible={isEditDatePickerVisible} mode="datetime" onConfirm={handleEditConfirm} onCancel={() => setEditDatePickerVisibility(false)} />
          <Text style={styles.label}>Priority</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={editPriority} onValueChange={itemValue => setEditPriority(itemValue)}>
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Urgent" value="Urgent" />
            </Picker>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button title="Submit" onPress={submitEditedTask} color="green" />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="red" />
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
  taskContainer: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#4e4949',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 22,
    fontFamily: 'nolluqa',
    color: 'white',
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
});



export default TasksScreen;
