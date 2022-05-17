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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RotateInUpLeft } from "react-native-reanimated";


function ClothingItem(props) {
  const a = React.useContext(ClothesContext);

  const deleteItem = (key, set) => {
    to_del = a.findIndex((item) => item.pieceid === key);
    a.splice(to_del, 1);

    const requestOptions = {
      method: "POST",
    };

    fetch(`http://${API}:${NODEPORT}/delete/123/` + key, requestOptions)
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
  };

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

  const navigation = useNavigation();

  const propagate = {
    id: props.id,
    text: props.text,
    date: props.date,
    image: props.image,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Add", {
          update: true,
          clothName : null,
          color : props.color,
          weather : props.weather,
          occasion : props.occasion,
          type : props.type,
          dirty : props.dirty,
          image : props.image,
        })
      }
    >
      <Swipeable
        renderRightActions={() => rightActions(props.id, props.update)}
      >
        <View style={props.dirty ? styles.dirtyitem : styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.container}>
              <Image
                style={{ width: 80, height: 100 }}
                source={{ uri: "data:image/jpeg;base64," + props.image }}
              />
            </View>
            <Text style={styles.itemText}>{props.text}</Text>
          </View>
          <View style={styles.container}>
            <Text style={props.dirty ? styles.itemDirty : styles.itemSanitary}>
              {props.dirty ? "\nDIRTY" : "\nCLEAN"}
            </Text>
          </View>
          <View style={styles.circular}></View>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
}

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
  dirtyitem: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    opacity: 0.8,
    backgroundColor: "#EDC9AF",
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
    maxWidth: "50%",
    paddingLeft: 15,
  },
  itemSanitary: {
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  itemDirty: {
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    color: "red",
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
