import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import ClothingItem from './../../components/ClothingItem';
import AddScreen from './AddScreen'
//import { ClothesContext} from '../../App';
import Wardrobe from '../../components/getWardrobe'
var clothes = [
   
  ];

export default function HomeScreen({ navigation, route }) {
  
  const value = Wardrobe();
   
   let list;
   if (Object.keys(value).length !== 0) {
     console.log(value[0]);
      list = value.map((clothes) =>
     <ClothingItem key = {clothes.pieceid} text={clothes.type + ' ' + clothes.color}/> 
  );
   }

  //navigation.setOptions({headerRight: () =>(
  // <Button 
      
   //     onPress={ () => navigation.navigate(AddScreen) } title = "add"               
   // />
   
  // )})

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
           {list != null ? list: true}
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
