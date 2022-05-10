import * as React from "react";
import CalibrateScreen from "../screens/CalibrateScreenComponents/CalibrateScreen"
import CalibrateSwipe from "../screens/CalibrateScreenComponents/CalibrateSwipe";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {OutfitContext} from '../../context/OutfitContext';

function CalibrateContainerScreen({navigation, route}){
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Screening" component = {CalibrateScreen}/>
            <Stack.Screen
                 name="Get"
                 component={CalibrateSwipe}
                options={{ title: ''}}
            />
        </Stack.Navigator>
    );
}
export default CalibrateContainerScreen