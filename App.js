import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, LogBox, ImagePropTypes } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize"
import AnimatedSplash from "react-native-animated-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import LoginScreen from "./app/screeens/LoginScreen"
import RegisterScreen from "./app/screeens/RegisterScreen"
import HomeScreen from "./app/screeens/HomeScreen"

import colors from "./app/config/colors"

const Stack = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' drawerType="front" overlayColor="transparent" edgeWidth={100} drawerStyle={{
        backgroundColor: colors.white,
        width: 0
      }}
      >
        <Stack.Screen name="loginScreen" >{(props) => <LoginScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="registerScreen" >{(props) => <RegisterScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="homeScreen" >{(props) => <HomeScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
