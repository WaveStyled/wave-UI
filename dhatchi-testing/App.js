import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Cloth from './components/Cloth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';
// import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const clothes = [
  {
    pieceid: uuid.v4(),
    name: 'Bape Hoddie',
    type: 'STES',
    color: 'brown',
    oc_formal: 0,
    oc_semi_formal: 0,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 0,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
  {
    pieceid: uuid.v4(),
    type: 'STES',
    name: "Levi Jeans",
    color: 'light_blue',
    oc_formal: 0,
    oc_semi_formal: 1,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 0,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
  {
    pieceid: uuid.v4(),
    type: 'STES',
    name: "YoungLA Shirt",
    color: 'light_blue',
    oc_formal: 0,
    oc_semi_formal: 1,
    oc_casual: 1,
    oc_workout: 0,
    oc_outdoors: 1,
    oc_comfy: 1,
    we_cold: 1,
    we_hot: 1,
    we_rainy: 1,
    we_snowy: 0,
    we_typical: 1
  },
];

function HomeScreen({navigation}){
  const [cloth, setCloth] = useState();
  const [clothItems, setClothItems] = useState([]);

  const handleAddCloth = () => {
    Keyboard.dismiss();
    setClothItems([...clothItems, cloth])
    setCloth(null);
  }
  
  


  const completeCloth = (index) => {
    let itemsCopy = [...clothItems];
    itemsCopy.splice(index, 1);
    setClothItems(itemsCopy)
  }
  // const Item = ({ item, onPress, backgroundColor, textColor }) => (
  //   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
  //     <Text style={[styles.title, textColor]}>{'Type: ' + item.type +  ' ' + 'Color: ' + item.color}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Clothing Items */}
      <View style={styles.clothsWrapper}>
        <Text style={styles.sectionTitle}>Clothing Items</Text>
        <View style={styles.items}>
          {/* This is where the cloths will go! */}
          <TouchableOpacity onPress={() => handleAddCloth()}>
          <Cloth text={clothes[0].name} /> 
          <Cloth text={clothes[1].name} /> 
          </TouchableOpacity>
          {
            
            clothItems.map((item, index) => {
              return (
              
                <TouchableOpacity key={index}  onPress={() => navigation.navigate('Details')}>
                 
                  <Cloth text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a cloth */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeClothWrapper}
      >
        <TextInput style={styles.input} placeholder={'Ex: Bape Hoodie'} value={cloth} onChangeText={text => setCloth(text)} />
        <TouchableOpacity onPress={() => handleAddCloth()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );

}

// function DetailsScreen() {
//   const [currency, setCurrency] = useState('US Dollar');
//   return (
//     <View >
//       <Text > Demo Form </Text>
//       <View>
//         <TextInput 
//           placeholder="Email" />
//         <TextInput
//           secureTextEntry={true}
//           placeholder="Password"
//         />
//         <Picker
//           selectedValue={currency}
//           onValueChange={currentCurrency => setCurrency(currentCurrency)}>
//           <Picker.Item label="USD" value="US Dollars" />
//           <Picker.Item label="EUR" value="Euro" />
//           <Picker.Item label="NGN" value="Naira" />
//         </Picker>
//         <Text>
//           Selected: {currency}
//         </Text>
//       </View>
//     </View>
//   );
// }



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  clothsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeClothWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});