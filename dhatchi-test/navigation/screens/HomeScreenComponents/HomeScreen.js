import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';


import AddScreen from './AddScreen'
//import { ClothesContext} from '../../App';
import ClothingItem from '../../../components/ClothingItem'
var clothes = [
   
];


function get(set){
    const requestOptions = {
      method: 'GET',
    };
    fetch('http://192.168.1.237:5000/wardrobe',requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        
        return response.json();
        
      })
      .then((json)=> {
        set(json)
      })
  }


  function update(json){
    var list;
    
      list = json.map((clothes) =>
     <ClothingItem key = {clothes.pieceid} text={clothes.type + ' ' + clothes.color}/> 
  );
    return list
  }



function addHeaderButton(navigation){
  React.useLayoutEffect(() => {navigation.setOptions({headerRight: () =>(
    <Button 
        
          onPress={ ()=>navigation.navigate('Add')}  title = "add"              
      />
     
     )})
  });
}
  


export default function HomeScreen({ navigation, route }) {
  const [wd,setWd] = React.useState({})
  
  //const updateWD = 
    //React.useCallback(val => {
    //  setWd(val);
    //},[setWd])
  
  
  
  React.useEffect(()=> {
    get(setWd)
   
  },[]);
  
  const value = update(wd);
  console.log(value)
  addHeaderButton(navigation)
  
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
           {value != null ? value: true}
        

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
