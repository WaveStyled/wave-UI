import 'react-native-gesture-handler'
import React, {useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Picker} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreen from './AddScreen'
import { useRoute } from '@react-navigation/native';
export default function  DetailScreen ({navigation}) {
    const route = useRoute();
    return (
        <View>
        <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold'}}>
        {route.params.name} Details
        </Text>
        <Text>ClothItem Type: {route.params.type}</Text>
        <Text>Color:  {route.params.color}</Text>
        <Text>Weather: {route.params.weather}</Text>
        <Text>Occasion: {route.params.occasion}</Text>
        </View>
    );
}