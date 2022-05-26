import * as React from "react";
import HomeScreen from "./HomeScreenComponents/HomeScreen";
import AddScreen from "./HomeScreenComponents/AddScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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