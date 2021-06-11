import React from "react";
import { Divider, Drawer } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function AppDrawer({ navigation }) {
    const [active, setActive] = React.useState('');


    return (
        <Drawer.Section  >
            <View style={{ flexDirection: 'row', padding: RFPercentage(2.4), marginTop: RFPercentage(3) }} >
                {/* <Image style={{ width: RFPercentage(31.5), height: RFPercentage(6.2) }} source={require("../assets/navigationIcon.png")} /> */}
            </View>
            <Divider />
            <Drawer.Item
                label="Home"
                icon="home"
                active={active === 'second'}
                onPress={() => navigation.navigate('Home')}
            />
            <Divider />
            <Drawer.Item
                label="Features"
            />

            <Drawer.Item
                label="Image To Text"
                icon="camera"
                active={active === 'second'}
                onPress={() => navigation.navigate('Home')}
            />
            <Drawer.Item
                label="Listen"
                icon="volume-high"
                active={active === 'third'}
                onPress={() => navigation.navigate("TextToVoice")}

            />
            <Drawer.Item
                label="Translate"
                icon="translate"
                active={active === 'third'}
                onPress={() => navigation.navigate("TranslateScreen")}

            />
            <Divider />
            <Drawer.Item
                label="Extras"
            />
            {/* <Drawer.Item
                label="Privacy Policy"
                icon="lock"
                active={active === 'third'}
                onPress={() => navigation.navigate("TranslateScreen")}
            /> */}

        </Drawer.Section>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "flex-start",
        paddingVertical: RFPercentage(2.4),

    }
})

export default AppDrawer;