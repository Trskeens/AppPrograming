import React, { useState } from "react";
import { SafeAreaView, StatusBar, Modal, Pressable, StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function App() {
  // State variables to manage the users question, response, and modal screen state
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle the submission of the users question
  const handleSubmission = () => {
    // Array of possible responses
    const possibleResponses = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ];
    
    // Selecting a random response from the array and displaying it
    const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    setResponse(randomResponse);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Rendering the components and views
  return (
    <>
      <StatusBar style="auto" />
      {/* The main container for the entire app */}
      <SafeAreaView style={styles.container}>
        {/* Container for the welcome message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>Welcome to The Magic 8 Ball app!</Text>
        </View>

        {/* Container for user input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your question here"
            value={question}
            onChangeText={(text) => setQuestion(text)}
          />
        </View>

        {/* Container for text */}
        <View style={styles.text2Container}>
          <Text style={styles.text2}>The Magic Eight Ball Has All The Answers!</Text>
        </View>

        {/* Container for the Submit button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={handleSubmission}
            color="#494343"
            style={styles.submitButton}
          />
        </View>

        {/* Modal for displaying user's question and Magic 8 Ball response */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Your Question:</Text>
              <Text>{question}</Text>
              <Text>Response:</Text>
              <Text>{response}</Text>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8e4994",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeContainer: {
    backgroundColor: "#494343",
    padding: 100,
    borderRadius: 10,
    marginBottom: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  text2Container: {
    backgroundColor: "#494343",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  text2: {
    fontSize: 16,
    color: "#ffffff",
  },
  buttonContainer: {
    marginTop: 50,
    paddingTop: 40,
    paddingBottom: 100,
  },
  submitButton: {
    paddingTop: 20,

  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1d1d00",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#494343",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
