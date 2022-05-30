/*
Component: ClothingItem
Purpose: Defines a clothing item from wardrobe as an object so that it can be rendered on the list  
*/

// imports
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

// local imports
import { API, NODEPORT } from "../context/API";
import { ClothesContext } from "../context/AppContext";
import { UserContext } from "../context/UserIDContext";
import Styles from '../assets/StyleSheets/ClothingItemStyle'

//
function ClothingItem(props) {
  // Load contexts
  const wardrobe = React.useContext(ClothesContext);
  const uid = React.useContext(UserContext);

  // Tell component to access navigation methods
  const navigation = useNavigation();

  // Load font
  // let [fontsLoaded, error] = useFonts({
  //   OpenSans: OpenSans_400Regular,
  // });

  /*
   Function: DeleteItem
   Purpose: Handles removal of an item from the wardrobe
  */
  const deleteItem = (key, setWD) => {
    // Find item in context using ID of the object
    to_del = wardrobe.findIndex((item) => item.pieceid === key);
    wardrobe.splice(to_del, 1);

    // Post to the Node server with the item to delete
    fetch(`http://${API}:${NODEPORT}/delete/${uid}/` + key, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        // set wardrobe to new one with deleted item
        setWD(json);
      });
    return true;
  };

  /*
  Function: rightActions
  Purpose: Defines the delete button that renders when an item is swiped right in wardrobe
  */
  const rightActions = (key, set) => {
    return (
      <>
        {/* Defines button that calls delete function on press */}
        <TouchableOpacity onPress={() => deleteItem(key, set)}>
          <View style={Styles.delSquare}>
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                paddingVertical: 50,
              }}
            >
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const leftActions = () => {
    return (
      <>
        {/* Defines button that calls delete function on press */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Add", {
              update: true,
              clothName: null,
              color: props.color,
              weather: props.weather,
              occasion: props.occasion,
              type: props.type,
              dirty: props.dirty,
              image: props.image,
              pieceid: props.id,
            })
          }
        >
          <View style={Styles.updateSquare}>
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                paddingVertical: 50,
              }}
            >
              Update
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  // Defines clothing item object as it is displayed and the swiping functionality
  return (
    <Swipeable
      renderRightActions={() => rightActions(props.id, props.update)}
      renderLeftActions={() => leftActions()}
    >
      <View style={props.dirty ? Styles.dirtyitem : Styles.item}>
        <View style={Styles.itemLeft}>
          <View style={Styles.container}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: "data:image/jpeg;base64," + props.image }}
            />
          </View>
          <Text style={Styles.itemText}>{props.text}</Text>
        </View>
        <View style={Styles.container}>
          <Text style={props.dirty ? Styles.itemDirty : Styles.itemSanitary}>
            {props.dirty ? "\nDIRTY" : "\nCLEAN"}
          </Text>
        </View>
        <View style={Styles.circular}></View>
      </View>
    </Swipeable>
  );
}

export default ClothingItem;
