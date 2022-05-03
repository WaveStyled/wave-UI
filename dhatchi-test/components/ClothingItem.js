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
import { API, NODEPORT } from "../context/API";
import { ClothesContext } from "../context/AppContext";

const imgpaths = {
  1: require("../assets/1.jpeg"),
  2: require("../assets/2.jpeg"),
  3: require("../assets/3.jpeg"),
};


const ClothingItem = (props) => {
  var z = imgpaths["1"];
  const a = React.useContext(ClothesContext);

  const deleteItem = (key, set) => {
    to_del = a.findIndex(item => item.pieceid === key);
    a.splice(to_del, 1);

    const requestOptions = {
      method: "POST",
    };
  
    fetch(`http://${API}:${NODEPORT}/delete/999/` + key, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        set(json);
      });
    return true;
  }

  const rightActions = (key, set) => {
    return (
      <>
        <TouchableOpacity onPress={() => deleteItem(key, set)}>
          <View style={styles.delSquare}>
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

  return (
    <Swipeable renderRightActions={() => rightActions(props.id, props.update)}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.container}>
            <Image
              style={{ width: 80, height: 100 }}
              source={props.id % 2 === 0 ? z : require("../assets/2.jpeg")}
            />
          </View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
    </Swipeable>
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

export default ClothingItem;
