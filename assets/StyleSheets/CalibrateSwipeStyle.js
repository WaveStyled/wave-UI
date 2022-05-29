import { StyleSheet } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

export default Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.yellow,
      paddingTop: 250,
      paddingBottom: 200,
    },
    swiperContainer: {
      flex: 0.55,
      paddingTop: 140,
    },
    bottomContainer: {
      flex: 0.45,
      justifyContent: "space-evenly",
    },
    bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
    bottomContainerButtons: {
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: 120,
    },
    text: {
      textAlign: "center",
      fontSize: 50,
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
    itemText: {
      maxWidth: "80%",
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: "bold",
      color: "white",
    },
    commandButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: "#2874A6",
      alignItems: "center",
      marginTop: 15,
      marginBottom: 5,
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });