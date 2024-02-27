import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "../components/Title";
import { RadioGroup } from "react-native-radio-buttons-group";
import Colors from "../constants/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NavButton from "../components/NavButton";

function HomeScreen(props) {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={require("..//assets/images/background.jpg")}
      resizeMode="cover"
      style={styles.rootContainer}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flexGrow: 1,
        }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Title style={styles.titleText}>Bike Repair</Title>
          </View>

          <View style={styles.radioContainer}>
            <Text style={styles.radioHeader}>Service Times:</Text>
            <RadioGroup
              radioButtons={props.repairTimeRadioButtons}
              onPress={props.setRepairTimeId}
              selectedId={props.repairTimeId}
              layout="row"
              containerStyle={styles.radioGroup}
              labelStyle={styles.radioGroupLabels}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.checkBoxContainer}>
              <Text style={styles.checkBoxHeader}>Services:</Text>
              <View style={styles.checkBoxSubContainer}>
                {props.services.map((item) => {
                  return (
                    <BouncyCheckbox
                      key={item.id}
                      text={item.name}
                      onPress={props.setServicesOptions.bind(this, item.id)}
                      textStyle={{
                        textDecorationLine: "none",
                        color: Colors.primary700,
                        fontFamily: "Migae",
                      }}
                      innerIconStyle={{
                        borderRadius: 0,
                        borderColor: Colors.primary800,
                      }}
                      iconStyle={{
                        borderRadius: 0,
                      }}
                      fillColor={Colors.primary800}
                      style={{
                        padding: 3,
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.addOnsContainer}>
              <View style={styles.addOnsSubContainer}>
                <Text style={styles.addOnsLabel}>News Letter Signup</Text>
                <Switch
                  onValueChange={props.setNewsletterSign}
                  value={props.newsletter}
                  thumbColor={
                    props.newsletter ? Colors.primary800 : Colors.primary700
                  }
                />
              </View>
              <View style={styles.addOnsSubContainer}>
                <Text style={styles.addOnsLabel}>
                  Rental Membership Signup
                </Text>
                <Switch
                  onValueChange={props.setRentalSign}
                  value={props.rentalMembership}
                  thumbColor={
                    props.rentalMembership
                      ? Colors.primary800
                      : Colors.primary700
                  }
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <NavButton onPress={props.onNext}>Submit</NavButton>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary500,
    paddingHorizontal: 0,
    paddingVertical: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioHeader: {
    fontSize: 30,
    color: Colors.primary500,
    fontFamily: "Migae",
  },
  radioGroup: {
    paddingBottom: 20,
  },
  radioGroupLabels: {
    fontSize: 15,
    color: Colors.primary500,
    fontFamily: "Migae",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    paddingLeft: 30,
  },
  checkBoxContainer: {},
  checkBoxHeader: {
    fontSize: 30,
    color: Colors.primary500,
    paddingLeft: 30,
    fontFamily: "Migae",
  },
  checkBoxSubContainer: {
    padding: 2,
  },
  addOnsContainer: {
    justifyContent: "space-between",
    paddingRight: 30,
  },
  addOnsSubContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  addOnsLabel: {
    color: Colors.primary500,
    fontSize: 20,
    fontFamily: "Migae",
  },
  buttonContainer: {
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Migae",
  },
});
