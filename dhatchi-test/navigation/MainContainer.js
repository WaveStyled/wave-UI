import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import axios from "axios";
//import { useState, useEffect } from 'react';
// Screens

import RecommendScreen from './screens/RecommendScreen';
import CalibrateScreen from './screens/CalibrateScreen';
import AddScreen from './screens/HomeScreenComponents/AddScreen';
//import HomeScreen from './screens/HomeScreen';
import HomeContainerScreen from './screens/HomeContainerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


//import HomeTabs from './screens/HomeTabs'

//Screen names

const homeName = "Home";
const RecommendName = "Recommend";
const CalibrateName = "Calibrate";
const addName = "Add";
const Tab = createBottomTabNavigator();





const Stack = createNativeStackNavigator();
function addHeaderButton(navigation){
  React.useLayoutEffect(() => {navigation.setOptions({headerRight: () =>(
    <Button 
        
          onPress={ () => 0 } title = "add"               
      />
     
     )})
  });
}
function HomeTabs({state, descriptors, navigation, route}){
  return (
    <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              // if(rn == "Add"){
              //   return;
              // }
              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline'; 
  
              } else if (rn === RecommendName) {
                iconName = focused ? 'shirt' : 'shirt-outline';
  
              } else if (rn === CalibrateName) {
                iconName = focused ? 'heart' : 'heart-outline';
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
          
          <Tab.Screen
              name={homeName}
              component={HomeContainerScreen}
              options={({ route }) => ({
                  tabBarVisible: ((route) => {
                      const routeName = getFocusedRouteNameFromRoute(route) ?? ""

                      if (routeName === "Add"){
                        return false
                      }

                      return true
                  })(route),
                  headerShown : false})}
          />

          <Tab.Screen name={RecommendName} component={RecommendScreen} options = {{headerShown : false }}/>
          <Tab.Screen name={CalibrateName} component={CalibrateScreen} options = {{headerShown : false}}/>
          
        </Tab.Navigator>
    );
}


function MainContainer({route, navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"HomeScreen"} component={HomeTabs} options = {{headerShown : false}} />
      <Stack.Screen name={"RecommendScreen"} component={HomeTabs} options = {{headerShown : false }}/>
      <Stack.Screen name={"CalibrateScreen"} component={HomeTabs} options = {{headerShown : false}}/>
    </Stack.Navigator>
  );
}


export default MainContainer;
