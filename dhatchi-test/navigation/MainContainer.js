import * as React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import RecommendScreen from "./screens/RecommendContainerScreen";
import CalibrateScreen from "./screens/CalibrateContainerScreen";
import HomeContainerScreen from "./screens/HomeContainerScreen";

import { ClothesContext } from "../context/AppContext";
import { UserContext } from "../context/UserIDContext";
import { API, NODEPORT } from "../context/API";

const homeName = "Home";
const RecommendName = "Recommend";
const CalibrateName = "Calibrate";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function getWardrobe(set, userid) {
  const requestOptions = {
    method: "GET",
  };
  fetch(`http://${API}:${NODEPORT}/startup/${userid}/`, { method: "PUT" }).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }
  );
  fetch(`http://${API}:${NODEPORT}/wardrobe/${userid}`, requestOptions)
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

function addHeaderButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => 0} title="Add Item" />,
    });
  });
}

function HomeTabs({ state, descriptors, navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      activeColor="darkred"
      barStyle={{ backgroundColor: "darkcyan" }}
    >
      <Tab.Screen
        name={homeName}
        component={HomeContainerScreen}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "Add") {
              return false;
            }

            return true;
          })(route),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        })}
      />

      <Tab.Screen
        name={RecommendName}
        component={RecommendScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Recommend",
          tabBarIcon: ({ color }) => (
            <Ionicons name="shirt" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={CalibrateName}
        component={CalibrateScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Calibrate",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainContainer({ route, navigation }) {
  const id = route.params.id
  const [wardrobeContext, setWardrobeContext] = React.useState([]);
  const [userid, setuserid] = React.useState(id);
  React.useEffect(() => {
    getWardrobe(setWardrobeContext, id);
  }, []);
  return (
    <UserContext.Provider value={userid}>
      <ClothesContext.Provider value={wardrobeContext}>
        <Stack.Navigator>
          <Stack.Screen
            name={"HomeScreen"}
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"RecommendScreen"}
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"CalibrateScreen"}
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ClothesContext.Provider>
    </UserContext.Provider>
  );
}

export default MainContainer;
