import 'react-native-gesture-handler'
import React, {useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Picker} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native-web';
import ClothingItem from '../../../components/ClothingItem'

import clothingItems from './AddComponents/Itemtype_Picker';
// import { ColorWheel } from 'react-native-color-wheel';
import ColorWheel_modified from './AddComponents/ColorWheel_modified';
import ratings from './AddComponents/Rating_Picker';
import weather from './AddComponents/Weather_Picker';
import occasion from './AddComponents/Occasion_Picker';
import { ClothesContext } from '../../../App';
import DropDownPicker from 'react-native-dropdown-picker';

occasion_mapping = {
  "FF" : 0,
  "SF" : 1,
  "CS" : 2,
  "WK" : 3,
  "BD" : 4,
  "LZ" : 5
};

weather_mapping = {
  "C" : 0,
  "H" : 1,
  "R" : 2,
  "N" : 3,
  "T" : 4,
};

function mapOccasionToBin(ocs){
  (arr = []).length = occasion.length; 
  arr.fill(0);
  for (var i = 0; i < ocs.length; i++) {
    arr[occasion_mapping[ocs[i]]] = 1;
  }
  return arr;
}

function mapWeatherToBin(we){
  (arr = []).length = weather.length; 
  arr.fill(0);
  for (var i = 0; i < we.length; i++) {
    arr[weather_mapping[we[i]]] = 1;
  }
  return arr;
}


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
fetch('http://63.249.96.165:5000/add/999/',requestOptions)
  .then((response) => {
  if (!response.ok) {
    throw response;
  }
})
return true;
}

//import ImageCropPicker from 'react-native-image-crop-picker';

function  AddScreen ({navigation}) {   
  const {colors} = useTheme();
  const [clothName, setClothName] = useState();
  const [color, setColor] = useState();

  const [weatherSelected, setWeatherItem] = useState([]);
  const [weather_picker_open, setWeatherPickerOpen] = useState(false);
  const [weat, setItems] = useState(weather);

  const [occasionSelected, setOccasion] = useState([]);
  const [occasion_open, setOccasionPickerOpen] = useState(false);
  const [occa, setOccasions] = useState(occasion);


  const [type, setType] = useState();
  const [type_open, setClothPickerOpen] = useState(false);


  console.log("######");
  console.log(weatherSelected);
  console.log(occasionSelected);
  console.log(type);


  const a = React.useContext(ClothesContext);

React.useCallback(val => {
  setWd(val)
  update(wd,updateWD)
},[])

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

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

bs = React.createRef();
var fall = new Animated.Value(1);

const submit_handler = () => {
  navigation.navigate("Wardrobe", {name: clothName})
}

//CHECK: when the save button is clicked, it navigates to the detail screen, and the name/color attribute entered
// on the form are displayed on a details screen. Not able to transfer data from pickers yet
const save_handler = () => {
  ws = mapWeatherToBin(weatherSelected);
  ocs = mapOccasionToBin(occasionSelected);

  toadd = {PIECEID: a.length+1, COLOR: color, TYPE: type, 
                    RECENT_DATE_WORN:null, TIMES_WORN: null,
                    RATING: null, OC_FORMAL: ocs[0], OC_SEMI_FORMAL: ocs[1],
                    OC_CASUAL: ocs[2], OC_WORKOUT : ocs[3], OC_OUTDOORS : ocs[4], OC_COMFY : ocs[5],
                    WE_COLD : ws[0], WE_HOT : ws[1], WE_RAINY: ws[2], WE_SNOWY:ws[3],
                    WE_TYPICAL: ws[4], DIRTY : 0};
  addItem(toadd);

  topush = {pieceid: a.length+1, color: color, type: type, 
    recent_date_worn:null, times_worn: null,
    rating: null, oc_formal: ocs[0], oc_semi_formal:ocs[1],
    oc_casual: ocs[2], oc_workout : ocs[3], oc_outdoors : ocs[4], oc_comfy : ocs[5],
    we_cold : ws[0], we_hot : ws[1], we_rainy: ws[2], we_snowy:ws[3],
    we_typical: ws[4], dirty : 1};

  a.push(topush);
  navigation.navigate("Wardrobe", {name: clothName})
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
      <ScrollView nestedScrollEnabled={true}>
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
        <View style={styles_multi.container}>

        <DropDownPicker
          placeholder = "Select Clothing Item"
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
            animationType: "fade"
          }}
          modalTitleStyle={{
            fontWeight: "bold"
          }}
          listParentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
          listParentLabelStyle={{
            fontWeight: "bold"
          }}
          listChildContainerStyle={{
            paddingLeft: 20
          }}
          listChildLabelStyle={{
            color: "grey"
          }}
          modalTitle="Clothing Options"
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
      <View style={styles.action}>
      <Ionicons  name="rainy-outline" color={colors.text} size={26} />
      <View style={styles_multi.container}>
        <DropDownPicker
          placeholder = "Select the Weather"
          open={weather_picker_open}
          value={weatherSelected}
          items={weather}
          setOpen={setWeatherPickerOpen}
          setValue={setWeatherItem}
          setItems={setItems}
          multiple={true}
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
            animationType: "fade"
          }}
          modalTitleStyle={{
            fontWeight: "bold"
          }}
          modalTitle="Weather Options"
      />
      </View>
    </View>
    <View style={styles.action}>
    <Ionicons  name="wine-outline" color={colors.text} size={26} />
    <View style={styles_multi.container}>
        <DropDownPicker
          placeholder = "Select the Occasion"
          open={occasion_open}
          value={occasionSelected}
          items={occasion}
          setOpen={setOccasionPickerOpen}
          setValue={setOccasion}
          setItems={setOccasions}
          multiple={true}
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
            animationType: "fade"
          }}
          modalTitleStyle={{
            fontWeight: "bold"
          }}
          modalTitle="Occasion Options"
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
      <TouchableOpacity style={styles.commandButton} onPress={save_handler}>
        <Text style={styles.panelButtonTitle}>Save</Text>
      </TouchableOpacity>
      </View>
  </View>
  
);
};


const styles2 = StyleSheet.create({ //this is for the picker
container: {
  flex: 1,
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

const styles_multi = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
}, 
multiSelectContainer :{
  height:'20%',
  width: '80%'
}
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