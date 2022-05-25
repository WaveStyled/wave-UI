/*
Component: OutfitComponent DEPRECATED
Purpose: Renders a single Clothing Item
*/

import React from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import "react-native-gesture-handler";

function OutfitComponent (props) {
  return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.container}>
            <Image
              style={{ width: 80, height: 100 }}
              source={{uri : 'data:image/jpeg;base64,' + props.image }}
            />
          </View>
        </View>
        <View style={styles.circular}></View>
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  delSquare: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "red",
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },
  square: {
    width: 80,
    height: 100,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default OutfitComponent;