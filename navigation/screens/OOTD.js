/*
 OOTD.js is the screen that shows the User's outfit of the day
*/

// Imports
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
} from "react-native";

// Local Imports
import { ClothesContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserIDContext";
import { getOOTD } from "../utils/Fetches";
import { OutfitOfTheDay } from "../utils/OutfitRender";
import { styles } from "../../assets/StyleSheets/OOTDStyle";

const { width } = Dimensions.get("window");

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

/*
Function: outfittoJSX

Purpose: Convert an array of pieceids to JSON representations
  using the ClothesContext

Input : ids : Arrays of outfits to be converted
        context : the clothes context that stores item representations in the app
*/
function outfittoJSX(ids, context) {
  console.log("IDS", ids);
  const test = ids.map(function (value) {
    if (value === 0) {
      return { image: " ", type: " ", color: " " };
    } else {
      var val = context.find((element) => element.pieceid === value);
      return val;
    }
  });
  return test;
}

/**
 * Function : OOTD
 * Purpose : displays the user's outfit of the day if available
 */
export default function OOTD({ route, navigation }) {
  const uid = React.useContext(UserContext);
  const context = React.useContext(ClothesContext);

  const [ootd, setOOTD] = React.useState([]);
  const [renderedootd, setOutfits] = React.useState([]);

  // update the OOTD everytime the user navigates on the screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOOTD(uid, setOOTD);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (ootd.length > 0) {
      setOutfits(
        outfittoJSX(
          ootd.filter((value) => value !== 0),
          context
        )
      );
    }
  }, [ootd]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center" }}
    >
      <MaterialCommunityIcons
        name="crop-square"
        size={width}
        color={colors.blue}
        style={{
          opacity: 0.05,
          transform: [{ rotate: "45deg" }, { scale: 1.6 }],
          position: "absolute",
          left: -15,
          top: 30,
        }}
      />
      <StatusBar hidden={false} />
      {/* renders the OOTD if available */}
      <View style={styles.swiperContainer}>
        {renderedootd.length > 0 ? (
          <OutfitOfTheDay card={renderedootd.filter((value) => value !== 0)} />
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={[styles.text, styles.heading]} numberOfLines={2}>
              <Text style={[styles.text, styles.price]}>
                {"No Outfit of the Day Available"}
              </Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
