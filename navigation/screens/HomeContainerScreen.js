/*
 HomeContainerScreen.js is the base structure of the Home screen, which 
 involves the wardrobe and the add screen
*/

// Imports
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Local Imports
import HomeScreen from "./HomeScreenComponents/HomeScreen";
import AddScreen from "./HomeScreenComponents/AddScreen";

/*
Function: HomeContainerScreen
Purpose: Framework for the Home screens
*/
function HomeContainerScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Wardrobe" component={HomeScreen} />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeContainerScreen;
