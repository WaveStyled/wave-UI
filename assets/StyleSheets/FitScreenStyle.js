import {StyleSheet } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ADD8E6",
      justifyContent: "center",
    },
    swiperContainer: {
      flex: 0.55,
    },
    bottomContainer: {
      flex: 0.45,
      justifyContent: "space-evenly",
    },
    bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
    bottomContainerButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    cardImage: {
      width: 160,
      flex: 1,
      resizeMode: "contain",
    },
    card: {
      flex: 0.45,
      borderRadius: 8,
      shadowRadius: 25,
      shadowColor: colors.black,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 0 },
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
    },
    text: {
      textAlign: "center",
      fontSize: 15,
      backgroundColor: "transparent",
    },
    done: {
      textAlign: "center",
      fontSize: 30,
      color: colors.white,
      backgroundColor: "transparent",
    },
    heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
    price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
    item: {
      backgroundColor: "#FFF",
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
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: "bold",
      color: "white",
      justifyContent: "center",
    },
    panelButtonTitle2: {
      fontSize: 17,
      fontWeight: "bold",
      color: "black",
      justifyContent: "center",
    },
    commandButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: "#2874A6",
      alignItems: "center",
      width: "60%",
      justifyContent: "center",
    },
  });
  