import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { API, NODEPORT } from "../../../context/API";
function FitScreen({ navigation }){
    const [fits, setFits] = React.useState(0);
    const clothes = ()=> {
        fetch(`http://${API}:${NODEPORT}/start_calibrate/123/20/`, {method: "PUT"})
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setFits(json);
      });
    }
    clothes()
    var counter = 0
    return (
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
    );
}
export default FitScreen