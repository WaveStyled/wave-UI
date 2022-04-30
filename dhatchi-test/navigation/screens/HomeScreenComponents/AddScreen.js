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
import clothingItems from './AddComponents/Itemtype_Picker';
// import { ColorWheel } from 'react-native-color-wheel';
import ColorWheel_modified from './AddComponents/ColorWheel_modified';
import ratings from './AddComponents/Rating_Picker';
import weathers from './AddComponents/Weather_Picker';
import occasions from './AddComponents/Occasion_Picker';

function update(json,set){  // maybe this could work?
  var list;
  if(Object.keys(json).length !== 0){
    list = json.map((clothes) =>
    <ClothingItem key = {clothes.pieceid} id = {clothes.pieceid} text={clothes.type + ' ' + clothes.color} update = {set}/> 
  );
  return list
  }
}

function addItem(props){
  console.log(props);
  const requestOptions = {
    method: 'POST',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify(props)
  };
  fetch('http://10.0.0.171:5000/add/999/',requestOptions)
    .then((response) => {
    if (!response.ok) {
      throw response;
    }
  })
  return true;
}

//import ImageCropPicker from 'react-native-image-crop-picker';

function  AddScreen ({navigation}) {   
//CHECK: useState to declare variables to store user inputs
   const {colors} = useTheme();
   const [type, setType] = useState();
   const [clothName, setClothName] = useState();
   const [color, setColor] = useState();
   const [weather, setWeather] = useState();
   const [occasion, setOccasion] = useState();
   const [rating, setRating] = useState();
   const [item, setClothingItem] = useState();
   console.log(item);

   const [image, setImage, isDirty, setDirty] = useState(image);
   const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();


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
    addItem({PIECEID: 200, COLOR: color, TYPE: type, 
                    RECENT_DATE_WORN:null, TIMES_WORN: null,
                    RATING: null, OC_FORMAL: 0, OC_SEMI_FORMAL:0,
                    OC_CASUAL: 0, OC_WORKOUT : 0, OC_OUTDOORS : 1, OC_COMFY : 0,
                    WE_COLD : 0, WE_HOT : 0, WE_RAINY: 0, WE_SNOWY:0,
                    WE_TYPICAL: 0, DIRTY : 1});
    
    //navigation.navigate("Details", {name: clothName, type: type,  color: color, weather: weather, occasion: occasion})
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
          <View style={styles2.inputStyle}>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                value={type} onChangeText={text => setType(text)}
                placeholder={{
                  label: 'Select the type of clothing item...',
                  value: null,
                  color:'red',
                  textAlignVertical : "bottom",
                  textAlign : "center",
                  justifyContent: 'center'
                }}
                itemStyle={{ backgroundColor: "black", color: "blue", fontFamily:"Ebrima", fontSize:17 , paddingHorizontal: 20}}
                items={[
                    { label: clothingItems[0], value: clothingItems[0] },
                    { label: clothingItems[1], value: clothingItems[1] },
                    { label: clothingItems[2], value: clothingItems[2] },
                    { label: clothingItems[3], value: clothingItems[3] },
                    { label: clothingItems[4], value: clothingItems[4] },
                    { label: clothingItems[5], value: clothingItems[5] },
                ]}
        />
    </View>
            
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
            value={color} onChangeText={color => setColor(color)}
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
        <View style={styles2.inputStyle}>
       
          <RNPickerSelect
              onValueChange={(value) => setWeather(value)}
              placeholder={{
                label: 'How\'s the weather today?...',
                value: null,
                color:'red',
              }}
              items={[
                  { label: weathers[0], value: weathers[0] },
                  { label: weathers[1], value: weathers[1] },
                  { label: weathers[2], value: weathers[2] },
                  { label: weathers[3], value: weathers[3] },
                  { label: weathers[4], value: weathers[4] },
              ]}
          />
   </View>
        </View>
        <View style={styles.action}>
        <Ionicons  name="wine-outline" color={colors.text} size={26} />
        <View style={styles2.inputStyle}>
       
       <RNPickerSelect
           onValueChange={(value) => setOccasion(value)}
           placeholder={{
             label: 'What\'s the occasion?',
             value: null,
             color:'red',
           }}
           items={[
               { label: occasions[0], value: occasions[0] },
               { label: occasions[1], value: occasions[1] },
               { label: occasions[2], value: occasions[2] },
               { label: occasions[3], value: occasions[3] },
               { label: occasions[4], value: occasions[4] },
               { label: occasions[5], value: occasions[5] },
           ]}
       />
   </View>
        </View>
        <View style={styles.action}>
        <Ionicons  name="ios-checkmark-outline" color={colors.text} size={26} />
        <View style={styles2.inputStyle}>
            <RNPickerSelect
              
                onValueChange={(value) => console.log(value)}
                placeholder={{
                  label: 'Rate from 1-10...',
                  value: null,
                  color:'red',
                }}
                items={[
                    { label: ratings[0], value: ratings[0] },
                    { label: ratings[1], value: ratings[1] },
                    { label: ratings[2], value: ratings[2] },
                    { label: ratings[3], value: ratings[3] },
                    { label: ratings[4], value: ratings[4] },
                    { label: ratings[5], value: ratings[5] },
                    { label: ratings[6], value: ratings[6] },
                    { label: ratings[7], value: ratings[7] },
                    { label: ratings[8], value: ratings[8] },
                    { label: ratings[9], value: ratings[9] },
                ]} 
            />
        </View>
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


const styles2 = StyleSheet.create({ //this is for the picker
  container: {
    flex: 2,
    backgroundColor: 'black',
  },
  inputStyle: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#cfe2f3',
    alignItems : 'center',
    fontSize : 200
  }
});

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    backgroundColor : '#dfe3ee',
    paddingVertical : '8%'
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#2874A6',
    alignItems: 'center',
    marginTop: 15,
  },
  panel: {
    padding: 20,
    backgroundColor: '#58D68D',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#E8EAED',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical : '5%'
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
    backgroundColor: '#45B39D',
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
    paddingTop: 20,
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