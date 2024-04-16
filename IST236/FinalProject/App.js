import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './screens/Calender';
import DashboardScreen from './screens/DashBoard';
import ProjectsScreen from './screens/Projects';
import TasksScreen from './screens/Tasks';
import Colors from './constants/colors';
import { Feather } from '@expo/vector-icons';
import { useCallback } from 'react';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator(){
  return (
<Tabs.Navigator
  screenOptions={{
    tabBarShowLabel: true,
    tabBarActiveBackgroundColor: Colors.primary800,
    tabBarActiveTintColor: Colors.accent500,
    tabBarInactiveBackgroundColor: Colors.primary500,
    tabBarInactiveTintColor: Colors.primary300,
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: "playfairBold"
    },
    tabBarStyle: {
      backgroundColor: Colors.primary500,
    },
  }}
>
  <Tabs.Screen 
    name='Dashboard'
    component={DashboardScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({color, size }) => (
        <Feather name="bar-chart-2" size={size} color={color} />
      ),
      tabBarLabel: "Dashboard",
    }}
  />
  <Tabs.Screen 
    name='Projects'
    component={ProjectsScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({color, size }) => (
        <Feather name="briefcase" size={size} color={color} />
      ),
      tabBarLabel: "Projects",
    }}
  />
  <Tabs.Screen 
    name='Tasks'
    component={TasksScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({color, size }) => (
        <Feather name="check-square" size={size} color={color} />
      ),
      tabBarLabel: "Tasks",
    }}
  />
  <Tabs.Screen 
    name='Calender'
    component={CalendarScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({color, size }) => (
        <Feather name="calendar" size={size} color={color} />
      ),
      tabBarLabel: "Calender",
    }}
  />
</Tabs.Navigator>
  );
}


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    playfair: require("./assets/fonts/Playfair.ttf"),
    playfairBold: require("./assets/fonts/PlayfairBold.ttf"),
    playfairItalic: require("./assets/fonts/PlayfairBoldItalic.ttf"),
    nolluqa: require("./assets/fonts/NolluqaRegular.otf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  })

  if (!fontsLoaded && !fontError){
    return null
  } else {
    return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='TabsNavigator'
          screenOptions={{
            headerTintColor: Colors.primary300,
            headerStyle: {backgroundColor: Colors.primary500},
            contentStyle: {backgroundColor: "black"},
          }}
        >
          <Stack.Screen 
          name="TabsNavigator"
          component={TabsNavigator}
          options={{
            headerShown: false
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});