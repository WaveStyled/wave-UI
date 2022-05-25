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
import { OutfitComponent } from "./OutfitComponent";

function Outfit(props) {
  console.log("HEHEHEHEHEHE")
  console.log(props.data);
  

  const value = update(props.data);

  return (  // for now this is a copy paste until we get something on the screen
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.clothsWrapper}>
          <View style={styles.items}>{value != null ? value : true}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E8EAED",
    },
    clothsWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    items: {
      marginTop: 30,
    },
    writeClothWrapper: {
      position: "absolute",
      bottom: 60,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: "#FFF",
      borderRadius: 60,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: "#FFF",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#C0C0C0",
      borderWidth: 1,
    },
    addText: {},
  });


export default Outfit;
