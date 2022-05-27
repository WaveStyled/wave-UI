import {StyleSheet } from "react-native";
export default Styles = StyleSheet.create({
    cardImage: {
      width: 160,
      height: 90,
      flex: 1,
      resizeMode: "contain",
      paddingLeft: 130,
      paddingTop: 10,
    },
    ootdimage: {
      width: 160,
      height: 110,
      flex: 1,
      resizeMode: "contain",
      paddingLeft: 130,
      paddingTop: 5,
    },
    card: {
      flex: 0.45,
      borderRadius: 8,
      shadowRadius: 25,
      shadowColor: 'black',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 0 },
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: 100,
      paddingBottom: 100,
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent",
    },
    item: {
      backgroundColor: "white",
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    itemText: {
      maxWidth: "80%",
    },
  });
  