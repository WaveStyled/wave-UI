import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from "react-native";

import AddScreen from "./AddScreen";
//import { ClothesContext} from '../../App';
import ClothingItem from "../../../components/ClothingItem";
import { useRoute } from "@react-navigation/native";
import { ClothesContext } from "../../../context/AppContext";
import { API, NODEPORT } from "../../../context/API";
import type_mapping from "../../../components/type_mapping";




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
  var typeconvert;
  if (Object.keys(json).length !== 0) {
    list = json.map((clothes) => (
      <ClothingItem
        key={clothes.pieceid}
        id={clothes.pieceid}
        text= { type_mapping[clothes.type]   + " " + clothes.color}
        update={set}
        image={clothes.image}
        dirty={clothes.dirty}
        color={clothes.color}
        weather={[clothes.we_cold, clothes.we_hot, clothes.we_rainy, clothes.we_snowy, clothes.we_avg_tmp]}
        occasion={[clothes.oc_formal, clothes.oc_semi_formal, clothes.oc_casual, clothes.oc_workout, clothes.oc_outdoors, clothes.oc_comfy]}
        type={clothes.type}
      />
    ));
    return list;
  }
}

function addHeaderButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Add", {update : false})} title="Add Item" />
      ),
    });
  });
}

export default function HomeScreen({ navigation, route }) {
  var context = React.useContext(ClothesContext);
  const [wd, setWd] = React.useState(context);


  const x = wd;
  const updateWD = React.useCallback((val) => {
    setWd(val);
    update(wd, updateWD);
  }, [wd]);


  if (wd.length !== context.length){
     setWd(context);
   }

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
          {/* <TouchableOpacity onPress={() => navigation.navigate("Details")}> */}
          <View style={styles.items}>
            {value != null ? value : true}
          </View>
          {/* </TouchableOpacity> */}
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
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  items: {
    marginTop: 0,
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