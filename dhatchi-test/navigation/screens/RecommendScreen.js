import * as React from 'react';
import { View, Text } from 'react-native';
import { ClothesContext } from '../../App';

export default function DetailsScreen({ navigation }) {
    const a = React.useContext(ClothesContext);
    console.log(a)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Recommend</Text>
        </View>
    );
}
