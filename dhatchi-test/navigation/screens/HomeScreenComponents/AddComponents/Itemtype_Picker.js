import React, {useState} from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";


export default function ItemType_Picker (labels) {
 const clothingItems = ["Shirts", "OverTops", "Pants", "Shorts", "Shoes", "Hat", "Misc"];
 const [type, setType] = useState();
  return (
    
    <View style={styles.inputStyle}>
        <RNPickerSelect
           
            onValueChange={(value) => console.log(value)}
            value={type} onChangeText={text => setType(text)}
            placeholder={{
              label: 'Select the type of clothing item...',
              value: null,
              color:'red',
            }}
            itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf5e2',
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

// export default ItemType_Picker;