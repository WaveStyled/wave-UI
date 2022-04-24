import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import axios from "axios";
//import { useState, useEffect } from 'react';
// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddScreen from './screens/AddScreen'

//Screen names
const homeName = "Home";
const detailsName = "Calibrate";
const settingsName = "Settings";
const addName = "Add";

const Tab = createBottomTabNavigator();


//console.log(wd)






function MainContainer({route, navigation}) {
  
  
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'; 

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
           // opts = {
            // "tabBarActiveTintColor": "tomato",
            //  "tabBarInactiveTintColor": "grey",
            //  "tabBarLabelStyle": {
             //   "paddingBottom": 5,
              //  "fontSize": 10
              //},
              //"tabBarStyle": [
               // {
               //  "display": "flex"
               // },
             // ]
            //}

            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
       
          tabBarInactiveTintColor: "grey",
          tabBarStyle: [
             {
              display: "flex"
             }]

        })}>
    
      <Tab.Screen name={homeName} component={HomeScreen} />
      
        <Tab.Screen name={detailsName} component={DetailsScreen} options = {{headerShown : false }}/>
        <Tab.Screen name={settingsName} component={SettingsScreen} options = {{headerShown : false}}/>
        
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}


export default MainContainer;
