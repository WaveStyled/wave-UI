import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import HomeScreen from "./navigation/screens/HomeScreenComponents/HomeScreen";
import AddScreen from "./navigation/screens/HomeScreenComponents/AddScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './navigation/screens/login/AuthScreen';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
export const ClothesContext = React.createContext("Hello");
function getWardrobe(set){
  const requestOptions = {
    method: 'GET',
  };
  fetch('http://10.0.0.30:5000/wardrobe', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
      //return response.json();
    })
    .then((json)=> {
      //console.log(json);
      set(json);
    })
}
export default function App() {
  const [dummy, setDummy] = React.useState({});
  React.useEffect(() => {
    getWardrobe(setDummy);
  }, []);
  return (
    <ClothesContext.Provider value={dummy}>

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
    </ClothesContext.Provider>

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

