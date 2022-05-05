import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

import AddScreen from "./AddScreen";
//import { ClothesContext} from '../../App';
import ClothingItem from "../../../components/ClothingItem";
import { useRoute } from "@react-navigation/native";
import { ClothesContext } from "../../../context/AppContext";
import { API, NODEPORT } from "../../../context/API";

function get(set) {
  const requestOptions = {
    method: "GET",
  };
  fetch(`http://${API}:${NODEPORT}/wardrobe`, requestOptions)
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

function update(json, set) {
  var list;
  if (Object.keys(json).length !== 0) {
    list = json.map((clothes) => (
      <ClothingItem
        key={clothes.pieceid}
        id={clothes.pieceid}
        text={clothes.type + " " + clothes.color}
        update={set}
        image={clothes.image}
      />
    ));
    return list;
  }
}

function addHeaderButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Add")} title="Add Item" />
      ),
    });
  });
}

export default function HomeScreen({ navigation, route }) {
  var context = React.useContext(ClothesContext);
  const [wd, setWd] = React.useState(context);


  const x = wd;
  const updateWD = React.useCallback((val) => {
    setWd(context);
    update(wd, updateWD);
  }, [wd]);

  const value = update(x, updateWD);

  addHeaderButton(navigation);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.clothsWrapper}>
          <View style={styles.items}>
            {value != null ? value : true}
          </View>
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
