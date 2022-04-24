import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { Swipeable, TouchableHighlight } from 'react-native-gesture-handler';

const rightActions = () => {
  return(
    <View>
    <Text>Delete</Text>
    </View>
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
  square: {
    width: 100,
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
