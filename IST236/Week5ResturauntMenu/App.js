import { StatusBar } from "expo-status-bar";
import {useState} from 'react';
import {StyleSheet, Text, View , Image, Linking, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";


export default function App() {
  //set up custom fonts
  const [fontLoaded] = useFonts({
    "MigaeSemibold": require("./assets/fonts/MigaeSemibold.otf")
  })
  //set state var for screen
  const [currentScreen, setCurrentScreen] = useState("home");

  function menuScreenHandler (){
    setCurrentScreen("menu");
  }
  function homeScreenHandler (){
    setCurrentScreen("home");
  }
    
  //Determine screen
  let screen = <HomeScreen onNext={menuScreenHandler}/>;

  if (currentScreen === "menu"){
    screen = <MenuScreen onNext={homeScreenHandler}/>;
  }
 
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider style={styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent500,
    alignItems: "center",
    justifyContent: "center",
  },
});
