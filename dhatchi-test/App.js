/*
 App.js is the startup point for the applications, the rest of the application
 is built out from this point
*/

// Imports
import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-reanimated";
// Local imports
import AuthScreen from "./navigation/screens/login/AuthScreen";
import LoadScreen from "./navigation/screens/LoadScreen";

// Init stack navigation
const Stack = createNativeStackNavigator();

/*
Function: App

Purpose: Initializes the application, displays the load screen. Start point for
the application.
*/

export default function App() {

  // Screens defined and load screen rendered
  return (
    
      <NavigationContainer>
        {/* Display load screen first */}
        <Stack.Navigator
          initialRouteName="LoadScreen"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#0080ff",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
            },
          }}
        >
          {/* Defines screen in the stack navigator */}
          <Stack.Screen
            name="LoadScreen"
            component={LoadScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainApp"
            component={MainContainer}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
