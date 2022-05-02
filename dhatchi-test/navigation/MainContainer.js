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
import AuthScreen from './screens/login/AuthScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//import HomeTabs from './screens/HomeTabs'

//Screen names

const homeName = "Home";
const RecommendName = "Recommend";
const CalibrateName = "Calibrate";
const addName = "Add";
const Tab = createMaterialBottomTabNavigator();





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
          activeColor="darkred"
          barStyle={{ backgroundColor: 'darkcyan' }}>

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
                  headerShown : false,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                  ),})}
          />

          <Tab.Screen 
            name={RecommendName}
            component={RecommendScreen} 
            options = {{headerShown : false, 
              tabBarLabel: 'Recommend',
              tabBarIcon: ({ color }) => (
                <Ionicons  name="shirt" color={color} size={26} />
              ),}}/>
          <Tab.Screen 
            name={CalibrateName} 
            component={CalibrateScreen} 
            options = {{headerShown : false, tabBarLabel: 'Calibrate',
            tabBarIcon: ({ color }) => (
              <Ionicons  name="heart-outline" color={color} size={26} />
              ),
            }}/>
          
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
