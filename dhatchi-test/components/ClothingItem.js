import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Animated } from 'react-native';
import 'react-native-gesture-handler';
import { Swipeable, TouchableHighlight } from 'react-native-gesture-handler';


const rightActions = () => {
   
  return(
    //<View
    //  style = {styles.delSquare}>
    //    <Text style = {{color: '#1b1a17',paddingHorizontal: 10, fontWeight: '600',paddingVertical: 20}}>
    //      Delete
    //    </Text>
    //</View>
    <>
    <TouchableOpacity onPress={() => alert('Delete button pressed')}>
    <View
      style={styles.delSquare}>
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingVertical:50,
          
        }}>
        Delete
      </Animated.Text>
    </View>
  </TouchableOpacity>
  </>
  )
}

const ClothingItem = (props) => {

  return (
    <Swipeable renderRightActions ={rightActions}>
    <View style={styles.item}>
      
      <View style={styles.itemLeft}>
      
        <View style={styles.square}></View>
        
        <Text style={styles.itemText}>{props.text}</Text>
       
      </View>
      
      <View style={styles.circular}></View>
      
    </View>
    </Swipeable>
    
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  delSquare: {
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,

  },
  square: {
    width: 80,
    height: 100,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default ClothingItem;
