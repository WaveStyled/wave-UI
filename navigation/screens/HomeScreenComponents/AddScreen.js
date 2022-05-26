/*
Screen: AddScreen
Purpose: Screen that handles the ability to enter information about new clothing item. User can: take a photo, add name, choose color, choose weather, occasion and indicate
whether it is dirty or not 
*/

// imports
import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { Platform } from "react-native-web";

// local imports
import clothingItems from "../../../components/Items";
import weather from "../../../components/Weathers";
import occasion from "../../../components/Occasions";
import DropDownPicker from "react-native-dropdown-picker";
import { ClothesContext } from "../../../context/AppContext";
import { UserContext } from "../../../context/UserIDContext";
import { addItem, updateItem } from "../../utils/Fetches";
import {
  propstooccasion,
  propstoweather,
  mapOccasionToBin,
  mapWeatherToBin,
} from "./AddComponents/AddFormHelpers";

import {
  styles,
  styles_multi,
} from "../../../assets/StyleSheets/AddScreenStyle";

/*
Function: AddScreen
Purpose: Main function that handles functionaility and rendering of the screen
*/

function AddScreen({ navigation, route }) {
  // Initiate Context's
  const uid = React.useContext(UserContext);
  const wardrobe = React.useContext(ClothesContext);

  // Initiate colors
  const { colors } = useTheme();

  // Initiation of state variables used throughout the screen

  // Name Selected
  const [clothName, setClothName] = useState();
  // color selected
  const [color, setColor] = useState();
  // Current weather selected
  const [weatherSelected, setWeatherItem] = useState([]);
  // Whether the weather picker is open
  const [weather_picker_open, setWeatherPickerOpen] = useState(false);

  const [weat, setItems] = useState(weather);
  // Current occasion selected
  const [occasionSelected, setOccasion] = useState([]);
  // whether occasion picker is open
  const [occasion_open, setOccasionPickerOpen] = useState(false);
  const [occa, setOccasions] = useState(occasion);
  // Type selected
  const [type, setType] = useState();
  // Whether type menu is open
  const [type_open, setClothPickerOpen] = useState(false);
  // Image and dirty boolean
  const [image, setImage, isDirty, setDirty] = useState(image);
  // Whether dirty is turned on or not
  const [isEnabled, setIsEnabled] = useState(
    route.params.dirty == null ? false : Boolean(route.params.dirty)
  );

  // Dirty/clean switch toggle
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Ensures permissions to access camera
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

 // If Update version of screen is being used, load in the already set details about the clothing item
 React.useEffect(() => {
  if (route.params.update) {
    setWeatherItem(propstoweather(route.params.weather));
    setOccasion(propstooccasion(route.params.occasion));
    setColor(route.params.color);
    setClothName(route.params.clothName);
    setImage(route.params.image);
    setType(route.params.type);
  }
}, []);

/* Function: TakeImage 
 Purpose: Funtionality for taking a photo when adding an item. Calls library functions to open camera and saves image to state
 Input: None
 Ouput: No return but sets images state
 */
const takeImage = async () => {
  // Check permissions
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission === true) {
    // Launch camera
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((image) => {
      if (!image.cancelled) {
        // Save to state
        setImage(image.uri);
      }
      this.bs.current.snapTo(1);
    });
  } 
  // Permissions not given
  else {
    Alert.alert("Do not have permission to open camera. Please check app settings.")
    this.bs.current.snapTo(1);
  }
};

  /*Function: adjustImage
    Purpose: Functionality for selecting the eregion of a photo to include. 
    Input: Initially selected image
    Ouput: New state set for image
   */
  const adjustImage = async (im) => {
    // Launch image editing functionality
    let manipResult = await manipulateAsync(
      im.uri,
      [
        {
          resize: {
            height: 400,
            width: 400,
          },
        },
      ],
      { compress: 0, format: SaveFormat.JPEG, base64: true }
    );
    // Set updated image
    setImage(manipResult.base64);
    return null;
  };
  /* 
     Function: pickImage
     Purpose: Functionality for selecting photo from image library
     Input: None
     Output: No return, but image state set
  */
  const pickImage = async () => {
    // Check permissions
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === true) {
      // Open photo library
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
        base64: true,
      }).then((image) => {
        if (!image.cancelled) {
          // Adjut photo call
          adjustImage(image);
        }
        this.bs.current.snapTo(1);
      });
    } else {
      Alert.alert("Do not have permission to open camera. Please check app settings.")
      this.bs.current.snapTo(1);
    }
  };
  /* Function: renderInner
     Purpose: handles the rendering of the popup menu when selecting an image
     Input/Ouput: None
  */
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose your Item Picture</Text>
      </View>
      {/* Three different buttons for taking photo, choosing and cancel */}
      <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      {/* On cancel get rid of slide up menu */}
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  /* 
    Function: readerHeader
    Purpose: Handles rendering for header of the screen
    Input/Output: None
  */
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  var fall = new Animated.Value(1);
  /*
  Function: update_handler
  Purpose: Handles updating the wardrobe after a user has edited the details of an item. Sends the update to the users wardrobe database
  Input: None
  Output: Updates entire wardrobe with change
  */
  const update_handler = () => {
    //If user gives no image
    if (!image) {
      console.log("here");
      Alert.alert("No image selected");
      return;
    }
    //If user does not select a clothing type
    if (!type) {
      Alert.alert("No Clothing Type Selected");
      return;
    }
    //If user does not select a weather
    if (weatherSelected.length == 0) {
      Alert.alert("No Weather selected");
      return;
    }
    //If user does not provide an occassion
    if (occasionSelected.length == 0) {
      Alert.alert("No Occassion selected");
      return;
    }
    // Convert selected weathers and occasions to bit array of selected values
    ws = mapWeatherToBin(weatherSelected);
    ocs = mapOccasionToBin(occasionSelected);
    // Defines item dictionary to be sent to backend with updates
    toupdate = {
      PIECEID: route.params.pieceid,
      COLOR: color,
      TYPE: type,
      DATE_ADDED: null,
      TIMES_WORN: null,
      RATING: null,
      OC_FORMAL: ocs[0],
      OC_SEMI_FORMAL: ocs[1],
      OC_CASUAL: ocs[2],
      OC_WORKOUT: ocs[3],
      OC_OUTDOORS: ocs[4],
      OC_COMFY: ocs[5],
      WE_COLD: ws[0],
      WE_HOT: ws[1],
      WE_RAINY: ws[2],
      WE_SNOWY: ws[3],
      WE_TYPICAL: ws[4],
      DIRTY: isEnabled ? 1 : 0,
      IMAGE: image,
    };
    // Update Post to backend
    updateItem(toupdate, uid);

  
    tochange = {
      pieceid: route.params.pieceid,
      color: color,
      type: type,
      date_added: null,
      times_worn: null,
      rating: null,
      oc_formal: ocs[0],
      oc_semi_formal: ocs[1],
      oc_casual: ocs[2],
      oc_workout: ocs[3],
      oc_outdoors: ocs[4],
      oc_comfy: ocs[5],
      we_cold: ws[0],
      we_hot: ws[1],
      we_rainy: ws[2],
      we_snowy: ws[3],
      we_typical: ws[4],
      dirty: isEnabled ? 1 : 0,
      image: image,
    };
    // Make changes to the loaded wardrobe to reflect the updates 
    to_change = wardrobe.filter(
      (value) => value.pieceid === route.params.pieceid
    );
    if (to_change.length > 0) {
      wardrobe[wardrobe.indexOf(to_change[0])] = tochange;
    }
    // Return to the wardrobe screen
    navigation.navigate("Wardrobe", {name : ""});
  };

  /*
  Function: save_handler
  Purpose: Handles saving a new clothing item to the database and to the apps context
  Input: None
  Output: Updates wardrobe 
  */
  const save_handler = () => {
    //list of weathers chosen by user in weather picker
    ws = mapWeatherToBin(weatherSelected);
    //list of occassions chosen by user in occasion picker
    ocs = mapOccasionToBin(occasionSelected);
    if (wardrobe.length === 0) {
      id = 0;
    } else {
      id = wardrobe[0].pieceid;
    }

    //If user gives no image
    if (!image) {
      console.log("here");
      Alert.alert("No image selected");
      return;
    }
    //If user does not select a clothing type
    if (!type) {
      Alert.alert("No Clothing Type Selected");
      return;
    }
    //If user does not select a weather
    if (weatherSelected.length == 0) {
      Alert.alert("No Weather selected");
      return;
    }
    //If user does not provide an occassion
    if (occasionSelected.length == 0) {
      Alert.alert("No Occassion selected");
      return;
    }
    //data to send to the backend
    toadd = {
      PIECEID: id + 1,
      COLOR: color,
      TYPE: type,
      DATE_ADDED: null,
      TIMES_WORN: null,
      RATING: null,
      OC_FORMAL: ocs[0],
      OC_SEMI_FORMAL: ocs[1],
      OC_CASUAL: ocs[2],
      OC_WORKOUT: ocs[3],
      OC_OUTDOORS: ocs[4],
      OC_COMFY: ocs[5],
      WE_COLD: ws[0],
      WE_HOT: ws[1],
      WE_RAINY: ws[2],
      WE_SNOWY: ws[3],
      WE_TYPICAL: ws[4],
      DIRTY: isEnabled ? 1 : 0,
      IMAGE: image,
    };
    //send data to the backend so it can be stored/used by model to train
    addItem(toadd, uid);

    //data to send back to the homescreen so user can view/edit clothing item details
    topush = {
      pieceid: id + 1,
      color: color,
      type: type,
      date_added: null,
      times_worn: null,
      rating: null,
      oc_formal: ocs[0],
      oc_semi_formal: ocs[1],
      oc_casual: ocs[2],
      oc_workout: ocs[3],
      oc_outdoors: ocs[4],
      oc_comfy: ocs[5],
      we_cold: ws[0],
      we_hot: ws[1],
      we_rainy: ws[2],
      we_snowy: ws[3],
      we_typical: ws[4],
      dirty: isEnabled ? 1 : 0,
      image: image,
    };
    //Update wardrobe context
    wardrobe.unshift(topush);
    navigation.navigate("Wardrobe", { name: clothName });
  };
  // Render of the main screen
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.container1}>
        <View style={{ alignItems: "center" }}>
          {/* Opens Photo Slide Up Menu*/}
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: "data:image/jpeg;base64," + image,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Camera Image */}
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "bold" }}>
            {route.params.update
              ? "Update Item in Wardrobe"
              : "Add Item to Wardrobe"}
          </Text>
        </View>
        
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.action}>
            {/*Name Text Input*/}
            <TextInput
              placeholder="Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={clothName} /* Update clothing name state */
              onChangeText={(text) => setClothName(text)}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name="shirt-outline" color={colors.text} size={26} />
            <View style={styles_multi.container}>
              {/* Clothing Type Drop Down */}
              <DropDownPicker
                placeholder="Select Clothing Item"
                searchable={true}
                searchPlaceholder="Search for Item..."
                open={type_open}
                value={type}
                items={clothingItems}
                setOpen={setClothPickerOpen}
                setValue={setType}
                itemSeparator={true}
                zIndex={3000}
                zIndexInverse={1000}
                mode="BADGE"
                theme="DARK"
                listMode="MODAL"
                categorySelectable={true}
                closeOnBackPressed={true}
                closeAfterSelecting={true}
                modalProps={{
                  animationType: "fade",
                }}
                modalTitleStyle={{
                  fontWeight: "bold",
                }}
                listParentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                listParentLabelStyle={{
                  fontWeight: "bold",
                }}
                listChildContainerStyle={{
                  paddingLeft: 20,
                }}
                listChildLabelStyle={{
                  color: "grey",
                }}
                modalTitle="Clothing Options"
              />
            </View>
          </View>
          <View style={styles.action}>
            <Ionicons name="images-outline" color={colors.text} size={26} />
            {/* Clothing Color Text Input */}
            <TextInput
              placeholder="Color"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={color}
              onChangeText={(color) => setColor(color)}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name="rainy-outline" color={colors.text} size={26} />
            <View style={styles_multi.container}>
              {/* Weather Drop Down Picker */}
              <DropDownPicker
                placeholder="Select the Weather"
                open={weather_picker_open}
                value={weatherSelected}
                items={weather}
                setOpen={setWeatherPickerOpen}
                setValue={setWeatherItem}
                setItems={setItems}
                multiple={true} /* Multiple Selections allowed */
                min={0}
                max={weather.length}
                itemSeparator={true}
                zIndex={3000}
                zIndexInverse={1000}
                mode="BADGE"
                theme="DARK"
                listMode="MODAL"
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
            <Ionicons name="wine-outline" color={colors.text} size={26} />
            <View style={styles_multi.container}>
              {/* Occasion Drop Down Picker */}
              <DropDownPicker
                placeholder="Select the Occasion"
                open={occasion_open}
                value={occasionSelected}
                items={occasion}
                setOpen={setOccasionPickerOpen} 
                setValue={setOccasion}
                setItems={setOccasions}
                multiple={true} /* Multiple Selections allowed */
                min={0}
                max={occasion.length}
                itemSeparator={true}
                zIndex={3000}
                zIndexInverse={1000}
                mode="BADGE"
                theme="DARK"
                listMode="MODAL"
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
          <View style={styles.action}>
            <Ionicons name="eye-off-outline" color={colors.text} size={26} />
            <View style={styles.action2}>
              {/* Dirty Check */}
              <Text style={styles.dirtyTitle}>Dirty?</Text>
              {/* Switch is an on off button */}
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </ScrollView>
        {/* Save Button */}
        <TouchableOpacity
          style={styles.commandButton}
          
          onPress={route.params.update ? update_handler : save_handler} /* Determines what mode to save in(update or add)*/
        >
          <Text style={styles.panelButtonTitle}>
            {route.params.update ? "Update" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddScreen;
