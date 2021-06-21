import React, { useEffect, useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AlertAsync from "react-native-alert-async";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "toastify-react-native";

// Components
import CartCard from '../components/CartCard';

// config
import colors from '../config/colors';
import AppTextButton from '../components/AppTextButton';

// services
import { orderCart } from "../services/OrderServices";

function CartScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [deleteAvailable, setDeleteAvailable] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [newTotalPrice, setNewTotalPrice] = useState([]);
    const [toastify, setToastify] = useState();


    const getCartProducts = async () => {
        try {
            let products = await AsyncStorage.getItem('product');
            if (products) {
                products = JSON.parse(products)
                let totalPrice = 0;
                for (let i = 0; i < products.length; i++) {
                    products[i].quantity = 1;
                    let price = products[i].price.match(/(\d+)/);
                    price = parseFloat(price)
                    totalPrice += price;
                }
                setProducts(products)
                setNewTotalPrice(totalPrice)
            }
        } catch (error) {
            console.log("products cart error: ", error)
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCartProducts()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        getCartProducts()
    }, [])

    // check if delete button can be enable
    const checkDeleteAvailable = () => {
        const available = products.filter(item => item.toDelete).map(item => item.toDelete).includes(true);
        setDeleteAvailable(available)
    }

    const handleLongPress = (index) => {
        let tempProducts = [...products];
        tempProducts[index].toDelete = !tempProducts[index].toDelete;
        setProducts(tempProducts)

        // check if delete button can be enable
        checkDeleteAvailable()
    }

    const handlePress = (index) => {
        let tempProducts = [...products];
        tempProducts[index].toDelete = !tempProducts[index].toDelete;
        setProducts(tempProducts)

        // check if delete button can be enable
        checkDeleteAvailable()
    }

    const handleDelete = async () => {
        let tempProducts = [...products];
        tempProducts = tempProducts.filter(item => !item.toDelete);
        setProducts(tempProducts);
        try {
            await AsyncStorage.removeItem('product');
            await AsyncStorage.setItem('product', JSON.stringify(tempProducts));
            calculateTotalPrice(tempProducts)
        } catch (error) {

        }
        // disable delte button
        setDeleteAvailable(false)
    }

    const orderNow = async () => {
        const res = await AlertAsync(
            'Order Confirmation',
            'Please Confirm the Order or Cancel',
            [
                { text: 'Confirm', onPress: () => 'yes' },
                { text: 'Cancel', onPress: () => Promise.resolve('no') },
            ],
            {
                cancelable: true,
                onDismiss: () => 'no',
            },
        );

        if (res == 'yes') {
            try {
                let tempProducts = [...products];
                let totalProducts = [];
                for (let i = 0; i < tempProducts.length; i++) {
                    let obj = {};
                    obj.title = tempProducts[i].title;
                    obj.price = tempProducts[i].price;
                    obj.quantity = tempProducts[i].quantity;
                    totalProducts.push(obj);
                }
                let res = await AsyncStorage.getItem('user');
                res = JSON.parse(res);

                let orderObj = {
                    products: totalProducts,
                    contactNumber: res.contactNumber,
                    email: res.email,
                    address: res.address,
                    totalPrice: newTotalPrice
                }

                await orderCart(orderObj);
                toastify.success("Order Successfull")

            } catch (error) {
                toastify.error("Order Not Completed")
            }
        }
    }

    const calculateTotalPrice = (tempProducts) => {
        let totalPrice = 0;
        for (let i = 0; i < tempProducts.length; i++) {
            let price = tempProducts[i].price.match(/(\d+)/);
            price = parseFloat(price) * tempProducts[i].quantity
            totalPrice += price;
        }
        setNewTotalPrice(totalPrice)
    }

    const handleIncrement = (index) => {
        let tempProducts = [...products];
        products[index].quantity = products[index].quantity + 1
        setProducts(tempProducts)
        calculateTotalPrice(tempProducts)
    }

    const handleDecrement = (index) => {
        let tempProducts = [...products];
        if (products[index].quantity > 1) {
            products[index].quantity = products[index].quantity - 1
            setProducts(tempProducts)
            calculateTotalPrice(tempProducts)
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title={`Cart (${products.length})`} />
                {/* <Appbar.Action color={colors.white} icon="account-circle" onPress={() => { }} /> */}
            </Appbar.Header>

            {/* toast component */}
            <Toast ref={(c) => setToastify(c)} />

            <View style={styles.container}>
                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                            {deleteAvailable ?
                                <View style={{ width: "90%", alignItems: "flex-end" }} >
                                    <TouchableOpacity onPress={() => handleDelete()} >
                                        <Text style={{ fontSize: RFPercentage(2.5), color: colors.danger }} >Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                : null
                            }

                            {/* Products */}
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />}
                                style={{ marginTop: deleteAvailable ? RFPercentage(1) : RFPercentage(3.5) }}
                                showsVerticalScrollIndicator={false}
                                data={products.length === 0 ? [{ blank: true }] : products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => handlePress(index)} onLongPress={() => handleLongPress(index)} activeOpacity={0.7} style={{
                                        margin: RFPercentage(1),
                                        marginLeft: "6%",
                                        backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                        // maxHeight: item.blank ? 0 : null,
                                        width: "100%",
                                        height: RFPercentage(12),
                                        flexDirection: "column",
                                    }} >
                                        {item.blank ? null :
                                            <CartCard handleDecrement={() => handleDecrement(index)} handleIncrement={() => handleIncrement(index)} index={index} price={item.price} title={item.title} quantity={item.quantity} description={item.description} image={item.image} />
                                        }
                                    </TouchableOpacity>

                                }
                            />

                            <View style={{ backgroundColor: colors.white, alignItems: "center", width: "100%", position: "absolute", bottom: 0, paddingBottom: RFPercentage(4) }} >
                                <View style={{ padding: RFPercentage(2), width: "50%", justifyContent: "space-evenly", flexDirection: "row" }} >
                                    <Text style={{ fontSize: RFPercentage(2.8) }} >Total</Text>
                                    <Text style={{ fontSize: RFPercentage(2.8), fontWeight: "bold" }}>{newTotalPrice}</Text>
                                </View>
                                <AppTextButton
                                    name="Order"
                                    width="80%"
                                    borderRadius={RFPercentage(1.3)}
                                    backgroundColor={colors.secondary}
                                    onSubmit={() => orderNow()}
                                />
                            </View>
                        </View>

                    </>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default CartScreen;