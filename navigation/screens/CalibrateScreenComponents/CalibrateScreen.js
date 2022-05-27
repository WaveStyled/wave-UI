/* 
Screen: Calibrate Screen
Purpose: Initial screen that is displayed before beginning the calibration
*/

// Imports
import * as React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

// Local Imports
import {UserContext} from '../../../context/UserIDContext'
import { ClothesContext } from "../../../context/AppContext";
import { getFits } from "../../utils/Fetches";
import Styles from '../../../assets/StyleSheets/CalibrateScreenStyle'
/*
Function: SettingsScreen
Purpose: Main functionality and rendering for the initial calibration screen 
*/
export default function SettingsScreen({ navigation }) {
  // Load context's
  const uid = React.useContext(UserContext);
  const clothes = React.useContext(ClothesContext)
 
  const [preloadFits, setFits] = React.useState([
    [[], []],
    [[], []],
  ]);

  React.useEffect(() => {
    getFits(setFits, uid);
  }, []);
  
  var buttonDisabled = false
  
  // If no fits loaded, not enough item to generate any
  if(preloadFits[0].length == 0){
    Alert.alert("Not enough clothing items to generate outfits.")
    buttonDisabled = true
  }
  /* 
  Function: getCalibration
  Purpose: transfer screen to the calibration screen
  Input: None
  Output: Screen change
  */
  const getCalibration = () => {
    navigation.navigate("Get", { initial: preloadFits });
  };

  // Render Screen
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Calibrate Screen</Text>
      {/* Start Clibration button, disabled when not enough clothes to load */}
      <TouchableOpacity
        style={Styles.commandButton}
        onPress={getCalibration}
        disabled={buttonDisabled}
      >
        <Text style={Styles.panelButtonTitle}>Get Calibrated!</Text>
      </TouchableOpacity>
    </View>
  );
}


