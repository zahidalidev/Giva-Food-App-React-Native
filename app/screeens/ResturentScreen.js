import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import colors from '../config/colors';
import OrderCard from '../components/OrderCard';

// services
import { deleteOrder, getAllNewOrders, getOrderRef } from '../services/OrderServices';

// new Order = !item.taken
// taken = taken && !confirm
// confirm = item.confirm

function ResturentScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [products, setProducts] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllOrders()
        setRefreshing(false);
    }, []);

    const handleOrderDelete = async (index) => {
        let olderTempOrders = [...products];
        let tempOrders = [...products];
        let docId = tempOrders[index].docId;
        tempOrders.splice(index, 1);
        setProducts(tempOrders);

        try {
            let res = await deleteOrder(docId)
            if (res) {
                await getAllOrders();
            }
        } catch (error) {
            console.log("Order Deletion Error: ", error)
            setProducts(olderTempOrders);
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        try {
            setRefreshing(true);
            let categoryRef = await getOrderRef();

            const observer = categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let res = await getAllNewOrders()

                    let temp = [];
                    for (let i = 0; i < res.length; i++) {
                        res[i].products = res[i].products.filter(item => item.restaurant == user.email)
                        temp.push(res[i]);
                    }

                    console.log('temp: ', temp)

                    setProducts(res)
                });
            });
        } catch (error) {
            console.log("Order found Error: ", error)
        }
        setRefreshing(false)
    }


    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title="Resturent Orders" />
            </Appbar.Header>
            <View style={styles.container}>
                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />}
                                style={{ marginTop: RFPercentage(3.5) }}
                                showsVerticalScrollIndicator={false}
                                data={products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return item.confirm ?
                                        <TouchableOpacity activeOpacity={0.7} style={{
                                            margin: RFPercentage(1),
                                            marginLeft: "4%",
                                            padding: RFPercentage(1),
                                            backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                            width: "90%",
                                            elevation: 3,
                                            flexDirection: "column",
                                        }} >
                                            {
                                                item.products.length === 0 ? null :
                                                    <OrderCard index={index} showCompletedBtn={true} onDelete={() => handleOrderDelete(index)} details={item} />
                                            }
                                        </TouchableOpacity> : null
                                }

                                }
                            />

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

export default ResturentScreen;