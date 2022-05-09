import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { API, NODEPORT } from "../../../context/API";
import { ClothesContext } from "../../../context/AppContext";

function getFits(set) {

    fetch(`http://${API}:${NODEPORT}/start_calibrate/123/5/`, {method: "PUT"})
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

function FitScreen({ navigation }){
    const [fits, setFits] = React.useState([[[],[]],[[],[]]]);
    const [curWeather, setWeather] = React.useState("r")
    const [curOccasion, setOccasion] = React.useState("")
    const [curIds, setIds] = React.useState([0])
    const [curCounter, incrementCounter] = React.useState(0)
    const a = React.useContext(ClothesContext);
    
    const updateHeader =() => {
        incrementCounter(curCounter + 1)
        
            setOccasion(fits[1][curCounter][0])
            setWeather(fits[1][curCounter][1])
            setIds(fits[0][curCounter])
         
    }
       
    React.useEffect(() => {
        getFits(setFits);
      }, []);
    
   //console.log(fits)
   React.useEffect(() => {
    setOccasion(fits[1][curCounter][0])
    setWeather(fits[1][curCounter][1])
    setIds(fits[0][curCounter])
  }, []);
   //setWeather(fits[1][counter][0])
    //setOccasion(fits[1][0][0])
    //console.log(curWeather)
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
            headerRight: () => (
           <Text>{curWeather}</Text>
          ),
          headerLeft: () => (
            <Text>{curOccasion}</Text>
          ),
        });
      });
      //console.log(a)
    var objects = []
    //console.log(curIds)
    React.useLayoutEffect(()=>{
        for ( var i = 0; i < 7; i++){
            //console.log(curIds[i])
            //console.log(a.filter((item)=> item.pieceid == curIds[i].toString()))
            objects.push(a.filter((item)=> item.pieceid == curIds[i].toString()))
        }
    })
   
    console.log(objects)
      // var x = a.filter((item)=> item.pieceid == "102")
    //console.log(x.map(({pieceid})=>(pieceid)))
    return (
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
      
            <TouchableOpacity style={styles.commandButton} onPress={updateHeader}>
            <Text style={styles.panelButtonTitle}>Like</Text>
            </TouchableOpacity>
            
    </View>
    
);
}

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

export default FitScreen