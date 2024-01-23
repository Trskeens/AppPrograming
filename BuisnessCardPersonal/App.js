import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View , Image, Linking } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.imagecontainer}>
        <Image style={styles.image} source={require("./assets/images/picofme.jpg")}/>
        </View>
        <View style={styles.informationcontainer}>
        <Text style={styles.text}>Trent Skeens</Text>
        <Text style={styles.text} onPress={() => Linking.openURL("mailto:tskeens@hgtc.edu")}>tskeens@hgtc.edu</Text>
        <Text style={styles.text} onPress={() => Linking.openURL("tel:6078461438")}>(607)-846-1438</Text>
        <Text style={styles.text} onPress={() => Linking.openURL("https://github.com/Trskeens/AppPrograming")}>https://github.com/Trskeens/AppPrograming</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9ceb5",
    alignItems: "center",
    justifyContent: "center",
  },
  imagecontainer: {
    flex: 3,
    paddingTop: 50,
    width: "100%",
  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: "#6a6c72",
  },
  informationcontainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 15
  }
});
