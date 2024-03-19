import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookmarksScreen from './screens/BookmarksScreen';
import DetailScreen from './screens/DetailScreen';
import TechNewsScreen from './screens/TechNewsScreen';
import USNewsScreen from './screens/USNewsScreen';
import WorldNewsScreen from './screens/WorldNewsScreen';
import Colors from './constants/colors';
import { Feather } from '@expo/vector-icons';
import { useCallback } from 'react';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName='Articles'
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "nolluqa",
          fontSize: 40,
          color: Colors.accent800
        },
        sceneContainerStyle: {backgroundColor: Colors.primary300},
        drawerContentStyle: {backgroundColor: Colors.primary500},
        drawerInactiveTintColor: Colors.primary300,
        drawerActiveTintColor: Colors.accent500,
        drawerActiveBackgroundColor: Colors.primary800
      }}
    >
      <Drawer.Screen 
        name="News"
        component={TabsNavigator}
        options={{
          title: "News",
          drawerLabel: "News Articles",
          drawerIcon: ({color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
      name="Bookmarked Articles"
      component={BookmarksScreen}
      options={{
        title: "Saved Articles",
        drawerLabel: "Saved Articles",
        drawerIcon: ({color, size }) => (
          <Feather name="bookmark" size={size} color={color} />
        ),
      }}
      />
    </Drawer.Navigator>
  )
}

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
      name='USNews'
      component={USNewsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size }) => (
          <Feather name="home" size={size} color={color} />
        ),
        tabBarLabel: "US News",
      }}
      />
      <Tabs.Screen 
      name='WorldNews'
      component={WorldNewsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size }) => (
          <Feather name="globe" size={size} color={color} />
        ),
        tabBarLabel: "World News",
      }}
      />
      <Tabs.Screen 
      name='TechNews'
      component={TechNewsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size }) => (
          <Feather name="tablet" size={size} color={color} />
        ),
        tabBarLabel: "Tech News",
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
          initialRouteName='DrawerScreen'
          screenOptions={{
            headerTintColor: Colors.primary300,
            headerStyle: {backgroundColor: Colors.primary500},
            contentStyle: {backgroundColor: "black"},
          }}
        >
          <Stack.Screen 
          name="DrawerScreen"
          component={DrawerNavigator}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen 
            name="Detail"
            component={DetailScreen}
            options={{
              headerBackTitleVisible: false
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
