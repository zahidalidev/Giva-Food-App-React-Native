import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "toastify-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import AppTextButton from '../components/AppTextButton';

// import logo from "../../assets/images/kitchenLogo.gif"
// import { loginUser } from '../services/userService';
import { useEffect } from 'react';
import AccountText from '../components/common/AccountText';

function ProfileScreen(props) {
    const [indicator, setIndicator] = useState(false);
    const [toastify, setToastify] = useState();
    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Email",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Contact Number",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Address",
            value: '',
        },
        {
            id: 4,
            placeHolder: "Password",
            value: '',
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        // const email = feilds[0].value;
        // const password = feilds[1].value;
        // try {
        //     setIndicator(true)
        //     const { data } = await loginUser(email, password);
        //     await AsyncStorage.setItem('token', data.id.toString());
        //     setIndicator(false)
        props.navigation.navigate('homeScreen')
        // } catch (error) {
        //     console.log("login error: ", error);
        //     setIndicator(false)
        //     toastify.error("Login Error");
        // }
    }


    useEffect(() => {
        // validateWithToken();
    }, [props.route.params]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={colors.primary} />

            {/* toast component */}
            <Toast ref={(c) => setToastify(c)} />

            {/* Kitchen buddy top container */}
            <View style={{ backgroundColor: colors.primary, width: "100%", flex: 0.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }} >
                <View style={{ marginTop: RFPercentage(2), width: '93%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <MaterialCommunityIcons onPress={() => props.navigation.navigate('homeScreen')} size={RFPercentage(3.8)} color={colors.white} name="chevron-left" />
                    <Text style={{ color: colors.white, fontSize: RFPercentage(3), fontFamily: "sans-serif-medium" }} >Profile</Text>
                    <TouchableOpacity>
                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.8), fontFamily: "sans-serif-medium" }} >Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: RFPercentage(2.8), width: RFPercentage(12), height: RFPercentage(12), borderRadius: RFPercentage(20), backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: RFPercentage(6), color: colors.primary }} >
                        Z
                    </Text>
                </View>
            </View>

            {indicator
                ? <View style={{ marginTop: -RFPercentage(7), borderTopRightRadius: RFPercentage(7), borderTopLeftRadius: RFPercentage(7), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                </View>
                : <>
                    {/* Bottom Contaienr */}
                    <View style={{ marginTop: -RFPercentage(7), borderTopRightRadius: RFPercentage(7), borderTopLeftRadius: RFPercentage(7), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }} >

                        {/* Text feilds */}
                        {feilds.map((item, i) =>
                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(8) : RFPercentage(4), width: "85%" }} >
                                <AppTextInput
                                    placeHolder={item.placeHolder}
                                    width="100%"
                                    value={item.value}
                                    onChange={(text) => handleChange(text, item.id)}
                                    secure={item.secure}
                                />
                            </View>
                        )}

                        {/* SignUp button */}
                        <View style={{ marginTop: RFPercentage(6), width: "85%", flex: 1, alignItems: "flex-end" }} >
                            <AppTextButton
                                name="Upate Profile"
                                borderRadius={RFPercentage(1.3)}
                                onSubmit={() => handleSubmit()}
                                backgroundColor={colors.primary}
                                width="100%"
                                height={RFPercentage(5.5)}
                            />
                        </View>
                    </View>



                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default ProfileScreen;