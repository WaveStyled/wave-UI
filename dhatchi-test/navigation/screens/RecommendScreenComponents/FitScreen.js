import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';

import { API, NODEPORT } from "../../../context/API";
function FitScreen({ navigation }){
    const clothes = ()=> {
        fetch(`http://${API}:${NODEPORT}/start_calibrate/123/20`, {method: "PUT"})
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
    }
    clothes()
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