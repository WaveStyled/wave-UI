import {StyleSheet } from "react-native";

export default Styles = StyleSheet.create({
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
    updateSquare: {
      flexDirection: "row",
  
      alignItems: "center",
      justifyContent: "space-between",
  
      backgroundColor: "green",
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
      fontFamily: "OpenSans",
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