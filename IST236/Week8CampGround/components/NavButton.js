import { Pressable, View, StyleSheet, Text, useWindowDimensions } from "react-native";
import Colors from "../constants/colors";

function NavButton(props) {
  const { width, height } = useWindowDimensions();

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressedItem,
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: width * 0.07 }]}>
          {props.children}
        </Text>
      </View>
    </Pressable>
  );
}

export default NavButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
    borderRadius: 300,
    width: 1000,
    maxWidth: "70%",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  textContainer: {
    padding: 8,
  },
  text: {
    textAlign: "center",
    color: Colors.primary800,
    fontFamily: "Mountain",
  },
});
