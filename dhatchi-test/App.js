import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./navigation/screens/login/AuthScreen";
import { StyleSheet } from "react-native";
import { ClothesContext } from "./context/AppContext";
import { API, NODEPORT } from "./context/API";
import "react-native-reanimated";
// import utils from '../utils';
import LoadScreen from "./navigation/screens/LoadScreen";

const Stack = createNativeStackNavigator();

function getWardrobe(set) {
  const requestOptions = {
    method: "GET",
  };
  fetch(`http://${API}:${NODEPORT}/startup/123/`, { method: "PUT" }).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }
  );
  fetch(`http://${API}:${NODEPORT}/wardrobe/123`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      set(json);
    });
}

export default function App() {
  const [dummy, setDummy] = React.useState([]);
  React.useEffect(() => {
    getWardrobe(setDummy);
  }, []);
  //startupModel()
  return (
    <ClothesContext.Provider value={dummy}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoadScreen"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#0080ff",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="LoadScreen"
            component={LoadScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainApp"
            component={MainContainer}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClothesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
