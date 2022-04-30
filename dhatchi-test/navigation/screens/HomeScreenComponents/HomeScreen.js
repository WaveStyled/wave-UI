import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';


import AddScreen from './AddScreen'
//import { ClothesContext} from '../../App';
import ClothingItem from '../../../components/ClothingItem'
import { useRoute } from '@react-navigation/native';
var clothes = [
   
];


function get(set){
    const requestOptions = {
      method: 'GET',
    };
    fetch('http://10.0.0.171:5000/wardrobe',requestOptions)
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

function update(json,set){
  var list;
  if(Object.keys(json).length !== 0){
    list = json.map((clothes) =>
    <ClothingItem key = {clothes.pieceid} id = {clothes.pieceid} text={clothes.type + ' ' + clothes.color} update = {set}/> 
  );
  return list
  }
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
  const [wd,setWd] = React.useState(1)
  const route_actual = useRoute();
  React.useEffect(()=> {
    get(setWd) 
  },[]);
  const x = wd;
  const updateWD = 
  React.useCallback(val => {
    setWd(val)
    update(wd,updateWD)
  },[])
  const value = update(x,updateWD);
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
            {/* CHECK: this line causes code raises undefined error */}
           {/* <Text> {route_actual.params.name}</Text> */}
       
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
