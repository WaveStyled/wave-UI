import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Picker,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddScreen from "./AddScreen";
import { useRoute } from "@react-navigation/native";
import { ClothesContext } from "../../../context/AppContext";
import { ClothingItem } from "../../../components/ClothingItem";
import { type_mapping } from "../../../components/types";

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item.id, item.text);
  return (
    <View style={styles.clothsWrapper}>
      <Text
        style={{
          marginTop: 15,
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: "30%",
        }}
      >
        Details
      </Text>
      <View style={styles.items}>
        
      </View>
      {/* </TouchableOpacity> */}
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
