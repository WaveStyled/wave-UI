import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import weather from "../../../components/Weathers";
import occasion from "../../../components/Occasions";
import BottomSheet from "reanimated-bottom-sheet";
import { API, NODEPORT } from "../../../context/API";

occasion_mapping = {
  FF: "oc_formal",
  SF: "oc_semi_formal",
  CS: "oc_casual",
  WK: "oc_workout",
  BD: "oc_outdoors",
  LZ: "oc_comfy",
};

weather_mapping = {
  C: "we_cold",
  H: "we_hot",
  R: "we_rainy",
  N: "we_snowy",
  T: "we_typical",
};

function initial_recommend(occasion, weather, set) {
  return fetch(
    `http://${API}:${NODEPORT}/recommend/123/${occasion}/${weather}`,
    {
      method: "PUT",
    }
  )
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

function DetailsScreen({ navigation }) {
  const [weatherSelected, setWeatherItem] = React.useState([]);
  const [weather_picker_open, setWeatherPickerOpen] = React.useState(false);
  const [weat, setItems] = React.useState(weather);

  const [occasionSelected, setOccasion] = React.useState([]);
  const [occasion_open, setOccasionPickerOpen] = React.useState(false);
  const [occa, setOccasions] = React.useState(occasion);

  const [recommend, setInitial] = React.useState(null);
  const [nav, setNav] = React.useState(false);
  const [recommend_ready, setRecommendReady] = React.useState(false);

  React.useEffect(() => {
    if (nav) {
      navigation.navigate("Get", {
        initial: recommend,
        occasion: occasion_mapping[occasionSelected],
        weather: weather_mapping[weatherSelected],
      });
    }
  }, [nav, recommend]);

  React.useEffect(() => {
    if (recommend != null){
      setNav(true)
    }
  }, [recommend]);

  const getFits = () => {
    console.log(
      occasion_mapping[occasionSelected],
      weather_mapping[weatherSelected]
    );
    initial_recommend(
      occasion_mapping[occasionSelected],
      weather_mapping[weatherSelected],
      setInitial
    );
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  refer = React.createRef();
  return (
    <View style={styles.container}>
      <BottomSheet
        snapPoints={[330, 0]}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledGestureInteraction={true}
      />

      <View style={styles.container1}>
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
        <TouchableOpacity style={styles.commandButton} onPress={getFits}>
          <Text style={styles.panelButtonTitle}>Get Fit</Text>
        </TouchableOpacity>
      </View>
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
  panel: {
    padding: 20,
    backgroundColor: "#58D68D",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
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
export default DetailsScreen;
