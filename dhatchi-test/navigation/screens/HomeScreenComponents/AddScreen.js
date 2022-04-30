import 'react-native-gesture-handler'
import React, {useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Picker} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native-web';
import ClothingItem from '../../../components/ClothingItem'
const clothTypes = [{ name: "shirts" }, { name: "Overtops" }];

import RNPickerSelect from "react-native-picker-select";
import Itemtype_Picker from './AddComponents/Itemtype_Picker';
// import { ColorWheel } from 'react-native-color-wheel';
import ColorWheel_modified from './AddComponents/ColorWheel_modified';
import Rating_Picker from './AddComponents/Rating_Picker';
import Weather_Picker from './AddComponents/Weather_Picker';
import Occasion_Picker from './AddComponents/Occasion_Picker';




//import ImageCropPicker from 'react-native-image-crop-picker';

function  AddScreen ({navigation}) {

//   const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
   
//CHECK: useState to declare variables to store user inputs
   const {colors} = useTheme();
   const [type, setType] = useState();
   const [clothName, setClothName] = useState();
   const [color, setColor] = useState();
   const [weather, setWeather] = useState();
   const [occasion, setOccasion] = useState();


   const [image, setImage, isDirty, setDirty] = useState(image);
   const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
   console.log(status);
   console.log(requestPermission);

  const takeImage = async() => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission === true){
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect : [4,3],
        quality: 1,
      }).then(image => {
        console.log(image);
        if (!image.cancelled) {
          setImage(image.uri);
        }
        this.bs.current.snapTo(1);
      })
    } else {
      console.log("denied permission. Please go to settings")
      this.bs.current.snapTo(1);
    }
  }

  const pickImage = async() => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === true){
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).then(image => {
        console.log(image);
        if (!image.cancelled) {
          setImage(image.uri);
        }
        this.bs.current.snapTo(1);
      });
    } else {
      console.log("denied permission. Please go to settings")
      this.bs.current.snapTo(1);
    }
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose your Item Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  var fall = new Animated.Value(1);

  const submit_handler = () => {
    navigation.navigate("Wardrobe", {name: clothName})
  }

  //CHECK: when the save button is clicked, it navigates to the detail screen, and the name/color attribute entered
  // on the form are displayed on a details screen. Not able to transfer data from pickers yet
  const save_handler = () => {
    navigation.navigate("Details", {name: clothName, type: type,  color: color, weather: weather, occasion: occasion})
  }


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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={
                  {
                    uri : image
                  }
                }
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold'}}>
            Add Item to Wardrobe
          </Text>
        </View>
        <ScrollView>
        <View style={styles.action}>
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
            //CHECK: how userinput is stored in a variable
            value={clothName} onChangeText={text => setClothName(text)}
          />
        </View>
        <View style={styles.action}>
          <Ionicons  name="shirt-outline" color={colors.text} size={26} />
          {/* <TextInput
            placeholder="Clothing Type"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]} />*/}
            <Itemtype_Picker items = {clothTypes}  value={type} onChangeText={text => setType(text)}/>
          
        </View>
        <View style={styles.action}>
          <Ionicons  name="images-outline" color={colors.text} size={26} />
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
            value={color} onChangeText={text => setColor(text)}
          />
        </View>
        {/* <View style={styles.action}>
        <Ionicons  name="heart-outline" color={colors.text} size={26} />
          <TextInput
            placeholder="KEYPAD EXAMPLE"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> */}
        <View style={styles.action}>
        <Ionicons  name="rainy-outline" color={colors.text} size={26} />
          {/* <TextInput
            placeholder="Weather"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          /> */}
          <Weather_Picker items = {clothTypes}
           value={weather} onChangeText={text => setWeather(text)}
          />
        </View>
        <View style={styles.action}>
        <Ionicons  name="wine-outline" color={colors.text} size={26} />
          <Occasion_Picker items = {clothTypes}
          value={occasion} onChangeText={text => setOccasion(text)}
          />
        </View>
        <View style={styles.action}>
        <Ionicons  name="ios-checkmark-outline" color={colors.text} size={26} />
        <Rating_Picker items = {clothTypes}/>
        </View>
        <View style={styles.action}>
        
        <Ionicons  name="eye-off-outline" color={colors.text} size={26} />
          <TextInput
              placeholder="Dirty? (Y/N)"
              placeholderTextColor="#666666"
              maxlength="1"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
        </View>
        </ScrollView> 
        <TouchableOpacity style={styles.commandButton} onPress={submit_handler}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={save_handler}>
          <Text style={styles.panelButtonTitle}>Save</Text>
        </TouchableOpacity>
        </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    backgroundColor : '#dfe3ee',
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 15,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      justifyContent : 'center',
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default AddScreen;