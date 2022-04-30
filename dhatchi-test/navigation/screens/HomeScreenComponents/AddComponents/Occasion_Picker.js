import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";

const occasions = ["Workout", "Formal", "Semi Formal", "Casual", "Beach Day/Outdoors", "Comfy/Lazy"]
export default occasions;

// export default function Occasion_Picker (labels) {
//   const clothingItems = ["Workout", "Formal", "Semi Formal", "Casual", "Beach Day/Outdoors", "Comfy/Lazy"]
//   return (
    
//     <View style={styles.inputStyle}>
       
//         <RNPickerSelect
//             onValueChange={(value) => console.log(value)}
//             placeholder={{
//               label: 'What\'s the occasion?',
//               value: null,
//               color:'red',
//             }}
//             items={[
//                 { label: clothingItems[0], value: clothingItems[0] },
//                 { label: clothingItems[1], value: clothingItems[1] },
//                 { label: clothingItems[2], value: clothingItems[2] },
//                 { label: clothingItems[3], value: clothingItems[3] },
//                 { label: clothingItems[4], value: clothingItems[4] },
//                 { label: clothingItems[5], value: clothingItems[5] },
//             ]}
//         />
//     </View>
//   );
//}

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
