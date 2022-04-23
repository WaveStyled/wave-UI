import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import ClothingItem from './../../components/ClothingItem';
import AddScreen from './AddScreen'


var clothes = [
    {
      pieceid: 0,
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
      pieceid: 1,
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
      pieceid: 2,
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

export default function HomeScreen({ navigation, route }) {
   const wardrobe = route.params;
   console.log(wardrobe)

    return (
        <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
            <View style={styles.clothsWrapper}>
        <View style={styles.items}>
          {/* This is where the cloths will go! */}

          <ClothingItem text={clothes[0].name} /> 
          <ClothingItem text={clothes[1].name} />   
      
          {/*
            
            clothItems.map((item, index) => {
              return (
              
                <TouchableOpacity key={index}  onPress={() => navigation.navigate('Details')}>
                 
                  <Cloth text={item} /> 
                </TouchableOpacity>
              )
            })
          */}
        </View>
      </View>
            </ScrollView>
        </View>
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
