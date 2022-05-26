/*
Screen: RecommendScreen
Purpose: Screen that displays the weather/occasion prompts to the user.
Also handles intial fetch of the recommendations before navigation
*/

// Imports
import * as React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Local Imports
import weather from "../../../components/Weathers";
import occasion from "../../../components/Occasions";
import Spinner from "react-native-loading-spinner-overlay";
import { UserContext } from "../../../context/UserIDContext";
import { getRecommendations } from "../../utils/Fetches";
import {
  styles,
  styles_multi,
} from "../../../assets/StyleSheets/RecommendScreenStyle";

// mapping of occasion codes to their string version in the backend
occasion_mapping = {
  FF: "oc_formal",
  SF: "oc_semi_formal",
  CS: "oc_casual",
  WK: "oc_workout",
  BD: "oc_outdoors",
  LZ: "oc_comfy",
};

// mapping of weather codes to their string version in the backend
weather_mapping = {
  C: "we_cold",
  H: "we_hot",
  R: "we_rainy",
  N: "we_snowy",
  T: "we_typical",
};

/*
Function: DetailsScreen
Purpose: Main function that handles functionaility and rendering of the screen
*/
function DetailsScreen({ navigation }) {
  const uid = React.useContext(UserContext);

  const [weatherSelected, setWeatherItem] = React.useState("none");
  const [weather_picker_open, setWeatherPickerOpen] = React.useState(false);
  const [weat, setItems] = React.useState(weather);

  const [occasionSelected, setOccasion] = React.useState("none");
  const [occasion_open, setOccasionPickerOpen] = React.useState(false);
  const [occa, setOccasions] = React.useState(occasion);

  // handles the initial recommend states and only navigates once those fetches come through
  const [recommend, setInitial] = React.useState(null);
  const [recommend_ready, setRecommendReady] = React.useState(false);
  const [nav, setNav] = React.useState(false);

  const [loading, Load] = React.useState(false); // sets spinner state

  var button = true; // only allow fetches if both weather and occasion are selected

  // send the outfits to FitScreen once navigation can happen
  React.useEffect(() => {
    if (nav) {
      Load(false);
      navigation.navigate("Get", {
        initial: recommend,
        occasion: occasion_mapping[occasionSelected],
        weather: weather_mapping[weatherSelected],
      });
      setNav(false);
    }
  }, [nav, recommend]);

  // if the backend cannot generate outfits, returns an alert
  React.useEffect(() => {
    if (recommend != null) {
      if (recommend.length == 0) {
        Alert.alert("Not enough items to generate outfit");
        Load(false);
      } else {
        setNav(true);
      }
    }
  }, [recommend]);

  if (occasionSelected != "none" && weatherSelected != "none") {
    button = false;
  }

  /*
  Fetches the initial batch of fits
  Output : sets navigation to true once the load comes through
  */
  const getFits = () => {
    getRecommendations(
      occasion_mapping[occasionSelected],
      weather_mapping[weatherSelected],
      setInitial,
      uid
    );
    Load(true);
    setTimeout(() => {
      Load(false);
    }, 8000);
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  /*
  Renders the occasion and weather selection
  */
  renderPrompt = () => (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          paddingBottom: 15,
          marginTop: 15,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Select desired Weather and Occasion
      </Text>
      <View style={styles.action}>
        <View style={styles_multi.container}>
          <DropDownPicker
            placeholder="Select the Weather"
            open={weather_picker_open}
            value={weatherSelected}
            items={weather}
            setOpen={setWeatherPickerOpen}
            setValue={setWeatherItem}
            setItems={setItems}
            dropDownDirection="TOP"
            multiple={false}
            min={1}
            max={weather.length}
            itemSeparator={true}
            zIndex={3000}
            zIndexInverse={1000}
            mode="BADGE"
            theme="DARK"
            closeOnBackPressed={true}
            modalProps={{
              animationType: "fade",
            }}
            modalTitleStyle={{
              fontWeight: "bold",
            }}
            modalTitle="Weather Options"
          />
        </View>
      </View>
      <View style={styles.action}>
        <View style={styles_multi.container}>
          <DropDownPicker
            placeholder="Select the Occasion"
            open={occasion_open}
            value={occasionSelected}
            items={occasion}
            setOpen={setOccasionPickerOpen}
            setValue={setOccasion}
            setItems={setOccasions}
            multiple={false}
            dropDownDirection="TOP"
            min={1}
            max={occasion.length}
            itemSeparator={true}
            zIndex={3000}
            zIndexInverse={1000}
            mode="BADGE"
            theme="DARK"
            closeOnBackPressed={true}
            modalProps={{
              animationType: "fade",
            }}
            modalTitleStyle={{
              fontWeight: "bold",
            }}
            modalTitle="Occasion Options"
          />
        </View>
      </View>
    </View>
  );

  /*
  Once the getFits button is pressed, renders
  Output : Spins until the recommendation comes through
  */
  renderLoad = () => (
    <Spinner
      visible={loading}
      textContent={"Loading Recommendations..."}
      textStyle={styles.spinnerTextStyle}
      cancelable={true}
    />
  );

  refer = React.createRef();
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {loading ? renderLoad() : renderPrompt()}

        <Text
          style={{
            paddingBottom: 15,
            marginTop: 15,
            fontSize: 11,
            fontWeight: "bold",
          }}
        >
          More calibrations, the better the recommendations
        </Text>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={getFits}
          disabled={button}
        >
          <Text style={styles.panelButtonTitle}>Get Fit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailsScreen;
