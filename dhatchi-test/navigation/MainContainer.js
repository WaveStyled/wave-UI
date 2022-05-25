/*
 MainConainer.js is the base structure of the home, recommend, ootd, and calibrate screens.
 Contains all the stack, tabs and context initialization
*/

// Imports
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Local imports
import RecommendScreen from "./screens/RecommendContainerScreen";
import CalibrateScreen from "./screens/CalibrateContainerScreen";
import HomeContainerScreen from "./screens/HomeContainerScreen";
import OOTD from "./screens/OOTD";
import { ClothesContext } from "../context/AppContext";
import { UserContext } from "../context/UserIDContext";
import { API, NODEPORT } from "../context/API";

//Screen Names
const homeName = "Home";
const RecommendName = "Recommend";
const CalibrateName = "Calibrate";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

/*
Function: getWardrobe

Purpose: Given a user id (which is propagated through login), initializes
the wardrobe to be displayed in the home screen

Input : set --> the setting function to be used in useEffect to initialize the context
        userid --> the id of the logged in user
*/

function getWardrobe(set, userid) {
  //invoke start up which either logs in or creates a new user
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
  //get the user's wardrobe
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

/*
Function: Hometabs

Purpose: Framework for the Bottom tab navigator so the user can easily
pick which screen to see
*/

function HomeTabs({ state, descriptors, navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      activeColor="darkred"
      barStyle={{ backgroundColor: "darkcyan" }}
    >
      {/* Home Screen Tab */}
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
      {/* Outfit of the Day Screen Tab */}
      <Tab.Screen
        name={"OOTD"}
        component={OOTD}
        options={{
          headerShown: false,
          tabBarLabel: "Outfit Of the Day",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hanger" color={color} size={26} />
          ),
        }}
      />
      {/* Recommend Screen Tab */}
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
      {/* Calibrate Screen Tab */}
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

/*
Function: MainContainer

Purpose: Framework for all the main app and compiles all the screens
with the bottom tab navigator

User ID is propagated as a navigation parameter and is initialized as a context
to be accessed throughout the app
*/
function MainContainer({ route, navigation }) {
  const id = route.params.id;

  console.log("ID: ", id);
  const [wardrobeContext, setWardrobeContext] = React.useState([]);
  const [userid, setuserid] = React.useState(id);

  React.useEffect(() => {
    getWardrobe(setWardrobeContext, id);
    setuserid(id);
  }, [userid]);

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
