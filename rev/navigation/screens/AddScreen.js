import * as React from 'react';
import { View, Text, Button } from 'react-native';

const addName = "Add";

export default function DetailsScreen({ navigation }) {
    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate(addName)}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Calibrate</Text>
        </View>
    );
}