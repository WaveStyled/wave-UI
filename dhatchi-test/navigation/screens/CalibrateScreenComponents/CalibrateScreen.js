import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { API, NODEPORT } from "../../../context/API";


async function getFits(set) {

  await fetch(`http://${API}:${NODEPORT}/start_calibrate/123/5/`, {method: "PUT"})
  .then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  })
  .then((json) => { 
  
      set(json);

  });
  }

export default function SettingsScreen({ navigation }) {


  const [preloadFits, setFits] = React.useState([[[],[]],[[],[]]])
 
  React.useEffect(() => {
    getFits(setFits);
  }, []);


  const getCalibration = () => {
    console.log(preloadFits)
    navigation.navigate("Get", {initial: preloadFits});
  };
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>
          Calibrate Screen
        </Text>
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
  container1: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "center",
    backgroundColor: "#dfe3ee",
    paddingVertical: "8%",
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },

  inputButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: "#58D68D",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#E8EAED",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: "5%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#45B39D",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    paddingTop: 20,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});

const styles_multi = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  multiSelectContainer: {
    height: "20%",
    width: "80%",
  },
});
