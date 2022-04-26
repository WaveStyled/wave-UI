import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import axios from "axios";
//import { useState, useEffect } from 'react';
// Screens
import HomeScreen from './HomeScreenComponents/HomeScreen';
import AddScreen from './HomeScreenComponents/AddScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function HomeContainerScreen({route, navigation}) {
  
  const Stack = createNativeStackNavigator();
  const tabHiddenRoutes = ["Add"];

if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
  navigation.setOptions({tabBarVisible: false});
 }else{
 navigation.setOptions({tabBarVisible: true});
}
    return (
        // <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddScreen}  options = {{tabBarVisible: false }} />
        </Stack.Navigator>
      // </NavigationContainer>

    ); 
}
export default HomeContainerScreen;