import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {UserContext} from '../../../context/UserIDContext'
import { getFits } from "../../utils/Fetches";

export default function SettingsScreen({ navigation }) {
  const uid = React.useContext(UserContext);

  const [preloadFits, setFits] = React.useState([
    [[], []],
    [[], []],
  ]);

  React.useEffect(() => {
    getFits(setFits, uid);
  }, []);

  const getCalibration = () => {
    navigation.navigate("Get", { initial: preloadFits });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Calibrate Screen</Text>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={getCalibration}
        disabled={false}
      >
        <Text style={styles.panelButtonTitle}>Get Calibrated!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});

