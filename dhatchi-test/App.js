import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import HomeScreen from "./navigation/screens/HomeScreenComponents/HomeScreen";
import AddScreen from "./navigation/screens/HomeScreenComponents/AddScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App() {
  
  return (
    <MainContainer/>
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //     <Stack.Screen name="Add" component={AddScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>
  );
}

export default App;