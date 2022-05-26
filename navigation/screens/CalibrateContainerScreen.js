/*
 CalibrateContainerScreen.js is the base structure of the calibration initiation and fit display
 phase, which facilitates model input and training
*/

// Imports
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Local Imports
import CalibrateScreen from "../screens/CalibrateScreenComponents/CalibrateScreen";
import CalibrateSwipe from "../screens/CalibrateScreenComponents/CalibrateSwipe";

/**
 * Function: CalibrateContainerScreen
 * Purpose: Defines the stack naviation of the calibrate components
 */
function CalibrateContainerScreen({ navigation, route }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Screening" component={CalibrateScreen} />
      <Stack.Screen
        name="Get"
        component={CalibrateSwipe}
        options={{ title: "Calibrate" }}
      />
    </Stack.Navigator>
  );
}
export default CalibrateContainerScreen;
