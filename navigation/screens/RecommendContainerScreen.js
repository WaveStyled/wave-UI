import * as React from "react";
import RecommendMainScreen from "./RecommendScreenComponents/RecommendScreen";
import FitScreen from "./RecommendScreenComponents/FitScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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