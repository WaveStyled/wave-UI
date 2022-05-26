/*
  Screen: HomeScreen
  Purpose: Displays the users wardrobe as a scolling list, has button to add and logout
*/
// Imports
import * as React from "react";
import { View, ScrollView, Button } from "react-native";

// Local Imports
import ClothingItem from "../../../components/ClothingItem";
import { ClothesContext } from "../../../context/AppContext";
import type_mapping from "../../../components/type_mapping";
import { auth } from "../login/FireBaseData";
import Styles from "../../../assets/StyleSheets/HomeScreenStyle"
/*
Function: update
Purpose: Update list of items being rendered on the list when some sort of information change has happened(add, delete, update)
Input: Json data from backend, set state funtion of the main wardrobe state
Output: List of Clothing Item objects ready for rendering on HomeScreen
*/
function update(json, set) {
  var list;
  if (Object.keys(json).length !== 0) {
    list = json.map((clothes) => (
      // Define a clothing item with information from rach json object
      <ClothingItem
        key={clothes.pieceid}
        id={clothes.pieceid}
        text={type_mapping[clothes.type] + " " + clothes.color}
        update={set}
        image={clothes.image}
        dirty={clothes.dirty}
        color={clothes.color}
        weather={[
          clothes.we_cold,
          clothes.we_hot,
          clothes.we_rainy,
          clothes.we_snowy,
          clothes.we_avg_tmp,
        ]}
        occasion={[
          clothes.oc_formal,
          clothes.oc_semi_formal,
          clothes.oc_casual,
          clothes.oc_workout,
          clothes.oc_outdoors,
          clothes.oc_comfy,
        ]}
        type={clothes.type}
      />
    ));
    // Return compiled list of Clothing Items
    return list;
  }
}
/*
Function: addHeaderButton
Purpose: Implements the Add button on top right of homescreen
Input: navigation -> object that controls the apps screens
Output: none

*/
function addHeaderButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // Navigates to Add screen
        <Button
          onPress={() => navigation.navigate("Add", { update: false })}
          title="Add Item"
        />
      ),
    });
  });
}
/*
Function: addLogoutButton
Purpose: Implenets the logout button on the top left of homescreen
Input: navigation -> object that controls the apps screens
Output: none
*/
function addLogoutButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // Triggers an auth sign out and navigates to login screen
        <Button
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace("LogIn");
            });
          }}
          title="Logout"
        />
      ),
    });
  });
}
/*
Function: HomeScreen
Purpose: Rendering and main functionality of the home screen
Input: None
Ouput: None
*/
export default function HomeScreen({ navigation, route }) {
  
  // Utilizes the Clothes context
  var context = React.useContext(ClothesContext);
  
  const [wd, setWd] = React.useState(context);
  
  const x = wd;

  const updateWD = React.useCallback(
    (val) => {
      setWd(val);
      update(wd, updateWD);
    },
    [wd]
  );

  if (wd.length !== context.length) {
    setWd(context);
  }

  const value = update(x, updateWD);
  
  // Implements header buttons
  addHeaderButton(navigation);
  addLogoutButton(navigation);

  // Home Screen render
  return (
    <View style={Styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={Styles.clothsWrapper}>
          
          {/* Renders the list of clothing items */}
          <View style={Styles.items}>{value != null ? value : true}</View>
  
        </View>
      </ScrollView>
    </View>
  );
}