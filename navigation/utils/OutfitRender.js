/*
 OutfitRender.js contains all the outfit and outfit description text rendering
 that will be used throughout the app
*/

// Imports
import { Image, Text, View, StyleSheet } from "react-native";
import type_mapping from "../../components/type_mapping";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

/*
Function : Card

Purpose : Renders the Card for the outfit display

Input : card --> JSON form of the outfits, which are extracted
  from the ClothesContext variable. Maps the JSON components
  image, type, color to JSX render objects
*/

export const Card = ({ card }) => {
  var outfit;
  if (card != null) {
    outfit = card.map((value, idx) => (
      <View key={idx} style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.cardImage}>
            {/* <View key={idx} style={styles.cardImage}> */}
            <Image
              style={{ width: 100, height: 50, paddingTop: 60 }}
              source={
                value.image.length !== 0
                  ? { uri: "data:image/jpeg;base64," + value.image }
                  : require("../../assets/white_item.jpeg")
              }
            />
            <Text key={idx} style={styles.itemText}>
              {type_mapping[value.type] + " " + value.color}
            </Text>
            {/* </View> */}
          </View>
        </View>
      </View>
    ));
  }
  return <View style={styles.card}>{outfit}</View>;
};

/*
Function : CardDetails

Purpose : Renders the details for a Card

Input : index --> text representation of the card details to be displayed
*/

export const CardDetails = ({ index }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={[styles.text, styles.heading]} numberOfLines={2}>
      <Text style={[styles.text, styles.price]}>{index}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  cardImage: {
    width: 160,
    height: 90,
    flex: 1,
    resizeMode: "contain",
    paddingLeft: 130,
    paddingTop: 10,
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
