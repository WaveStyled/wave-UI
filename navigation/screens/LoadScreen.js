/*
 LoadScreen.js is first screen users see on app boot-up before
 the login page. Includes logo and title.
*/

// Imports
import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import GlobalStyle from "../utils/GlobalStyle";

/*
 Function: Load Screen
 Purpose: Render the bootup page of the app
 Navigates to the login page
*/
export default function LoadScreen({ navigation }) {

  // after the timeout passes, moves to login
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("LogIn");
    }, 100);
  }, []);

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require("../../assets/loadlogo.png")}
      />
      <Text style={[GlobalStyle.CustomFontBig, styles.text]}>Wave-Styled</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: "#ffffff",
  },
});
