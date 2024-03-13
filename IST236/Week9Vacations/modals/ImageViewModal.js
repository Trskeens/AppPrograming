import { Modal, View, Button, Image, Text, StyleSheet } from "react-native";

function ImageViewModal(props) {
  const { isVisible, destination, onClose } = props;

  if (!isVisible || !destination) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.modalContainer}>
        <Image style={styles.image} source={{ uri: destination.imageUrl }} />
        <Text style={styles.description}>{destination.description}</Text>
        <Button title="Close Modal" onPress={onClose} />
      </View>
    </Modal>
  );
}

export default ImageViewModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(87, 94, 190)",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  description: {
    marginVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
