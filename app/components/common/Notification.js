import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

//and then use like so
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function Notification(props) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("response zahid: ", response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    // async function registerForPushNotificationsAsync() {
    //     let token;
    //     if (Constants.isDevice) {
    //         const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //         let finalStatus = existingStatus;
    //         if (existingStatus !== 'granted') {
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== 'granted') {
    //             alert('Failed to get push token for push notification!');
    //             return;
    //         }
    //         token = (await Notifications.getExpoPushTokenAsync()).data;
    //         console.log(Platform.OS, "  ", token);
    //     } else {
    //         alert('Must use physical device for Push Notifications');
    //     }

    //     if (Platform.OS === 'android') {
    //         Notifications.setNotificationChannelAsync('default', {
    //             name: 'default',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#FF231F7C',
    //         });
    //     }

    //     return token;
    // }


    // const sendTo = async () => {
    //     console.log("ios", expoPushToken)

    //     const arr = [{
    //         "to": "ExponentPushToken[-pIuasJ4dIFEaaA4Jn1xBV]",
    //         "sound": "default",
    //         "body": "Hello world!"
    //     }, {
    //         "to": "ExponentPushToken[-pIuasJ4dIFEaaA4Jn1xBV]",
    //         "badge": 1,
    //         "body": "You've got mail"
    //     }]

    //     fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(arr)
    //     }).then((response) => response.json())
    //         .then((responseJson) => { console.log(responseJson) })
    //         .catch((error) => { console.log(error) });
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => sendTo()} >
                <Text>Send.......</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Notification;