import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize"
import AnimatedSplash from "react-native-animated-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

// Screens
import LoginScreen from "./app/screeens/LoginScreen"
import RegisterScreen from "./app/screeens/RegisterScreen"
import HomeScreen from "./app/screeens/HomeScreen"
import ProductScreen from "./app/screeens/ProductScreen"
import ProductDetailsScreen from "./app/screeens/ProductDetailsScreen"
import CartScreen from "./app/screeens/CartScreen"
import ProfileScreen from "./app/screeens/ProfileScreen"
import RiderScreen from "./app/screeens/RiderScreen"
import ResturentScreen from "./app/screeens/ResturentScreen"
import AdminScreen from "./app/screeens/AdminScreen"
import MyOrdersScreen from "./app/screeens/MyOrdersScreen"

import colors from "./app/config/colors"
import AppDrawer from './app/components/AppDrawer';
import Notification from './app/components/common/Notification';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs();

export default function App() {
  const config = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  function Root() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }} initialRouteName='loginScreen'
      >
        <Stack.Screen name="loginScreen" >{(props) => <LoginScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="registerScreen" >{(props) => <RegisterScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="homeScreen" >{(props) => <HomeScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="productScreen" >{(props) => <ProductScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="productDetailsScreen" >{(props) => <ProductDetailsScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="cartScreen" >{(props) => <CartScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="profileScreen" >{(props) => <ProfileScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="riderScreen" >{(props) => <RiderScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="resturentScreen" >{(props) => <ResturentScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="adminScreen" >{(props) => <AdminScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="notification" >{(props) => <Notification {...props} />}</Stack.Screen>
        <Stack.Screen name="myOrdersScreen" >{(props) => <MyOrdersScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="root" drawerType={"front"}
        overlayColor="transparent"
        edgeWidth={100}
        drawerStyle={{
          backgroundColor: colors.white,
          width: "75%"
        }}
        drawerContent={(props) => <AppDrawer {...props} />}
      >
        <Drawer.Screen name="root" component={Root} />
      </Drawer.Navigator>
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
