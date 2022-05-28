/*
 OutfitRender.js contains all the outfit and outfit description text rendering
 that will be used throughout the app
*/

// Imports
import { Image, Text, View} from "react-native";
import type_mapping from "../../components/type_mapping";

//Local Imports
import Styles from "../../assets/StyleSheets/OutfitRenderStyle"
import { useSharedValue } from "react-native-reanimated";
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
      <View key={idx} style={Styles.item}>
        <View style={Styles.itemLeft}>
          <View style={Styles.cardImage}>
            {/* <View key={idx} style={styles.cardImage}> */}
            <Image
              style={{ width: 100, height: 50, paddingTop: 60 }}
              source={{ uri: "data:image/jpeg;base64," + value.image }}
            />
            <Text key={idx} style={Styles.itemText}>
              {type_mapping[value.type] + " " + value.color}
            </Text>
            {/* </View> */}
          </View>
        </View>
      </View>
    ));
  }
  return <View style={Styles.card}>{outfit}</View>;
};

/*
Function : CardDetails

Purpose : Renders the details for a Card

Input : index --> text representation of the card details to be displayed
*/

export const CardDetails = ({ index }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={[Styles.text, Styles.heading]} numberOfLines={2}>
      <Text style={[Styles.text, Styles.price]}>{index}</Text>
    </Text>
  </View>
);

export const OutfitOfTheDay = ({ card }) => {
  var outfit;
  if (card != null) {
    outfit = card.map((value, idx) => (
      <View key={idx} style={Styles.item}>
        <View style={Styles.itemLeft}>
          <View style={Styles.ootdimage}>
            {/* <View key={idx} style={styles.cardImage}> */}
            <Image
              style={{ width: 100, height: 90, paddingTop:10 }}
              source={{ uri: "data:image/jpeg;base64," + value.image }}
            />
            <Text style={Styles.itemText}>
              {value.color.toUpperCase() + " " + type_mapping[value.type].toUpperCase()}
            </Text>
            {/* </View> */}
          </View>
        </View>
      </View>
    ));
  }
  return <View style={Styles.card}>{outfit}</View>;
};
