import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ClothesContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserIDContext";

import {getOOTD } from "../utils/Fetches";
import { Card, CardDetails } from "../utils/OutfitRender";

const { width } = Dimensions.get("window");


const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

function outfittoJSX(ids, a){
  console.log("IDS", ids);
  //var keys = item.filter((value) => value !== 0);
  const test = ids.map(function (value) {
    if (value === 0){
      return {image : " ", type : " ", color : " "}
    } else {
      var val = a.find((element) => element.pieceid === value);
      return val;
    }
  });
  return test;
}


export default function OOTD({ route, navigation }) {
  const uid = React.useContext(UserContext);
  const a = React.useContext(ClothesContext);
  const [ootd, setOOTD] = React.useState([]);
  const [renderedootd, setOutfits] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOOTD(uid, setOOTD);
    })
  }, [])

  React.useEffect(() => {
    if (ootd.length > 0){
      setOutfits(outfittoJSX(ootd, a));
    }
  }, [ootd])

  return (
    <SafeAreaView style={styles.container}>
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
      <StatusBar hidden={true} />
      <View style={styles.swiperContainer}>
        {renderedootd.length > 0 ? <Card card={renderedootd}/> : <CardDetails index={"No OOTD Available"} />/* <Card card={true} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    paddingTop: 250,
    paddingBottom: 200,
  },
  swiperContainer: {
    flex: 0.55,
    paddingTop: 140,
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 100,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
  price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
  itemText: {
    maxWidth: "80%",
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },
});
