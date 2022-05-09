import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
// s
import GlobalStyle from '../utils/GlobalStyle';

export default function LoadScreen({ navigation }) {

    useEffect(() => {
        // createChannels();
        setTimeout(() => {
            navigation.replace('LogIn');
        }, 2000);
    }, []);

    // const createChannels = () => {
    //     PushNotification.createChannel(
    //         {
    //             channelId: "task-channel",
    //             channelName: "Task Channel"
    //         }
    //     )
    // }

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../../assets/loadlogo.png')}
            />
            <Text
            style={[
                GlobalStyle.CustomFontBig,
                styles.text
            ]}
            >
                Wave-Styled
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color: '#ffffff',
    },
})