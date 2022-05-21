import { Image, Text, View, StyleSheet } from "react-native";
import type_mapping from "../../../../components/type_mapping";

const colors = {
    red: "#EC2379",
    blue: "#0070FF",
    gray: "#777777",
    white: "#ffffff",
    black: "#000000",
    green: "green",
  };

export const Card = ({ card }) => {
  var outfit;
  if (card != null) {
    outfit = card.map((value, idx) => (
      <View key={idx} style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.cardImage}>
            {/* <View key={idx} style={styles.cardImage}> */}
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: "data:image/jpeg;base64," + value.image }}
            />
            {/* </View> */}
          </View>
          <Text key={idx} style={styles.itemText}>
            {type_mapping[value.type] + " " + value.color}
          </Text>
        </View>
      </View>
    ));
  }
  return <View style={styles.card}>{outfit}</View>;
}

const styles = StyleSheet.create({
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
      fontSize: 50,
      backgroundColor: "transparent",
    },
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
  });
  