import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const clothes = [
  {
    pieceid: 1,
    type: 'STES',
    color: 'brown',
    oc_formal: 0,
    oc_semi_formal: 0,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 0,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
  {
    pieceid: 2,
    type: 'STES',
    color: 'light_blue',
    oc_formal: 0,
    oc_semi_formal: 1,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 0,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
  {
    pieceid: 3,
    type: 'STES',
    color: 'light_blue',
    oc_formal: 0,
    oc_semi_formal: 1,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 1,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{'Type: ' + item.type +  ' ' + 'Color: ' + item.color}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.pieceid === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.pieceid === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.pieceid)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clothes}
        renderItem={renderItem}
        keyExtractor={(item) => item.pieceid}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;