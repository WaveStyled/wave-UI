import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./navigation/screens/login/AuthScreen";
import "react-native-reanimated";
import LoadScreen from "./navigation/screens/LoadScreen";

const Stack = createNativeStackNavigator();


export default function App() {

  //startupModel()
  return (
      <NavigationContainer>
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
