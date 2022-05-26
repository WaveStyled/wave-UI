/*
 RecomendContainerScreen.js is the base structure of the Recommend components
 which involves the weather/occasion selection and the actual fits display
*/

// Imports
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Local Imports
import RecommendMainScreen from "./RecommendScreenComponents/RecommendScreen";
import FitScreen from "./RecommendScreenComponents/FitScreen";

/*
Function: RecommendContainer
Purpose: Framework for the recommend screens
*/
function RecommendContainerScreen({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecommendMain" component={RecommendMainScreen} />
      <Stack.Screen name="Get" component={FitScreen} options={{ title: "" }} />
    </Stack.Navigator>
  );
}

export default RecommendContainerScreen;
