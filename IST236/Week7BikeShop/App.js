import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useMemo, useCallback } from "react";

import Colors from './constants/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import OrderReviewScreen from './screens/OrderReview';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";


export default function App() {
  const [currentScreen, setCurrentScreen] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [repairTimeId, setRepairTimeId] = useState(0);
  const [newsletter, setNewsletter] = useState(false);
  const [rentalMembership, setRentalMembership] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Migae": require("./assets/Fonts/MigaeSemibold.otf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsynch();
    }
  }, [fontsLoaded, fontError])
  
  const repairTimeRadioButtons = useMemo(
    () => [
      {
        id: "0",
        label: "Standard",
        value: "Standard",
        price: 0,
        borderColor: Colors.primary800,
        color: Colors.primary800,
      },
      {
        id: "1",
        label: "Expedited",
        value: "Expedited",
        price: 50,
        borderColor: Colors.primary800,
        color: Colors.primary800,
      },
      {
        id: "2",
        label: "Next Day",
        value: "Next Day",
        price: 100,
        borderColor: Colors.primary800,
        color: Colors.primary800,
      },
    ],
    []
  );
  
  const [services, setServices] = useState([
    { id: 0, name: "Basic Tune-Up", value: false, price: 50 },
    { id: 1, name: "Comprehensive Tune-Up", value: false, price: 75 },
    { id: 2, name: "Flat Tire Repair", value: false, price: 20 },
    { id: 3, name: "Brake Servicing", value: false, price: 50 },
    { id: 4, name: "Gear Servicing", value: false, price: 40 },
    { id: 5, name: "Chain Servicing", value: false, price: 15 },
    { id: 6, name: "Frame Repair", value: false, price: 35 },
    { id: 7, name: "Safety Check", value: false, price: 25 },
    { id: 8, name: "Accessory Install", value: false, price: 10 },
  ]);
  

  function setServiceOptionsHandler(id) {
    setServices((prevTimes) =>
      prevTimes.map((item) =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  }

  function setSignUpHandler() {
    setNewsletter((previous) => !previous)
  }

  function setRentalSignUpHandler() {
    setRentalMembership((previous) => !previous)
  }

  function homeScreenHandler() {
    setCurrentPrice(0);
    setCurrentScreen("home");
    setRepairTimeId("");
    setNewsletter(false);
    setRentalMembership(false);
    setServices(services.map(service => ({ ...service, value: false })));
  }

  function orderReviewHandler() {

    let price = 0;
    for (let i = 0; i < services.length; i++) {
      if (services[i].value){
        price = price + services[i].price
      }
    }

    if (newsletter){
      price = price + 0;
    }

    if (rentalMembership){
      price = price + 100;
    }

    price = price + repairTimeRadioButtons[repairTimeId].price

    setCurrentPrice(price);



    if (repairTimeId)
    setCurrentScreen("review")
  }

  let screen = (
    <HomeScreen
      newsletter={newsletter}
      setNewsletter={setNewsletter}
      setNewsletterSign={setSignUpHandler}
      setRentalSign={setRentalSignUpHandler}
      rentalMembership={rentalMembership}
      setRentalMembership={setRentalMembership}
      currentPrice={currentPrice}
      setCurrentPrice={setCurrentPrice}
      services={services}
      setServices={setServices}
      setServicesOptions={setServiceOptionsHandler}
      repairTimeRadioButtons={repairTimeRadioButtons}
      repairTimeId={repairTimeId}
      setRepairTimeId={setRepairTimeId}
      onNext={orderReviewHandler}
    />
  );

  if (currentScreen == "review") {
    screen = (
      <OrderReviewScreen 
      rentalMem={rentalMembership}
      news={newsletter}
      times={repairTimeRadioButtons[repairTimeId].value}
      service={services}
      price={currentPrice}
      onNext={homeScreenHandler}
      />
    )
  }

  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <SafeAreaProvider style={styles.container}>{screen}</SafeAreaProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
