import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Cloth from './components/Cloth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';



const HomeScreen  = () =>{
    const [cloth, setCloth] = useState();
    const [clothItems, setClothItems] = useState([]);
  
    const handleAddCloth = () => {
      Keyboard.dismiss();
      setClothItems([...clothItems, cloth])
      setCloth(null);
    }
    
    
  
  
    const completeCloth = (index) => {
      let itemsCopy = [...clothItems];
      itemsCopy.splice(index, 1);
      setClothItems(itemsCopy)
    }
    // const Item = ({ item, onPress, backgroundColor, textColor }) => (
    //   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //     <Text style={[styles.title, textColor]}>{'Type: ' + item.type +  ' ' + 'Color: ' + item.color}</Text>
    //   </TouchableOpacity>
    // );
  
    return (
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
  
        {/* Clothing Items */}
        <View style={styles.clothsWrapper}>
          <Text style={styles.sectionTitle}>Clothing Items</Text>
          <View style={styles.items}>
            {/* This is where the cloths will go! */}
            <TouchableOpacity onPress={() => handleAddCloth()}>
            <Cloth text={clothes[0].name} /> 
            <Cloth text={clothes[1].name} /> 
            </TouchableOpacity>
            {
              
              clothItems.map((item, index) => {
                return (
                
                  <TouchableOpacity key={index}  onPress={() => navigation.navigate('Details')}>
                   
                    <Cloth text={item} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
          
        </ScrollView>
  
        {/* Write a cloth */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeClothWrapper}
        >
          <TextInput style={styles.input} placeholder={'Ex: Bape Hoodie'} value={cloth} onChangeText={text => setCloth(text)} />
          <TouchableOpacity onPress={() => handleAddCloth()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </View>
    );
  
  }
  export default  HomeScreen;