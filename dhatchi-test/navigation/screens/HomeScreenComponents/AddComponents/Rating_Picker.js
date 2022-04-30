import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";


export default function Rating_Picker (labels) {
 const clothingItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    
    <View style={styles.inputStyle}>
        <RNPickerSelect
           
            onValueChange={(value) => console.log(value)}
            placeholder={{
              label: 'Rate from 1-10...',
              value: null,
              color:'red',
            }}
            items={[
                { label: clothingItems[0], value: clothingItems[0] },
                { label: clothingItems[1], value: clothingItems[1] },
                { label: clothingItems[2], value: clothingItems[2] },
                { label: clothingItems[3], value: clothingItems[3] },
                { label: clothingItems[4], value: clothingItems[4] },
                { label: clothingItems[5], value: clothingItems[5] },
                { label: clothingItems[6], value: clothingItems[6] },
                { label: clothingItems[7], value: clothingItems[7] },
                { label: clothingItems[8], value: clothingItems[8] },
                { label: clothingItems[9], value: clothingItems[9] },
            
            ]}
            
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf5e2',
    alignItems: 'center',
    justifyContent: 'center',
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