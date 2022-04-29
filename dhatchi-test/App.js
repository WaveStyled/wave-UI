import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import HomeScreen from "./navigation/screens/HomeScreenComponents/HomeScreen";
import AddScreen from "./navigation/screens/HomeScreenComponents/AddScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './navigation/screens/AuthScreen';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name = "LogIn"
          component = {AuthScreen}
          options= {{headerShown : false}}
        />
        <Stack.Screen
          name = "MainApp"
          component={MainContainer}
          options={{headerShown : false, gestureEnabled : false}}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

