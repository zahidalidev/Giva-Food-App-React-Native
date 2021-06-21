import React, { useEffect, useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// config
import colors from '../config/colors';
import OrderCard from '../components/OrderCard';
import { getAllNewOrders, getOrderRef } from '../services/OrderServices';

// new Order = !item.taken
// taken = taken && !confirm
// confirm = item.confirm

function RiderScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeComponent, setActiveComponent] = useState('newOrder');

    const [products, setProducts] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllOrders();
        setRefreshing(false);
    }, []);

    const handleOrderTaken = async (index) => {
        let tempOrders = [...products];
        tempOrders[index].taken = true;
        tempOrders[index].confirm = false;
        setProducts(tempOrders)
    }

    const handleOrderConfirm = async (index) => {
        let tempOrders = [...products];
        tempOrders[index].taken = true;
        tempOrders[index].confirm = true;
        setProducts(tempOrders)
    }

    const handleOrderDelete = async (index) => {
        let tempOrders = [...products];
        let docId = tempOrders[index].docId;
        tempOrders.splice(index, 1);
        setProducts(tempOrders)
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = async () => {
        try {
            setRefreshing(true);
            let categoryRef = await getOrderRef();

            const observer = categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let res = await getAllNewOrders()
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
                <Appbar.Content color={colors.white} title="Orders" />
            </Appbar.Header>
            <View style={styles.container}>
                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            {/* buttons */}
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), backgroundColor: colors.primary }} >
                                <View style={{ width: "90%", flexDirection: "row" }} >
                                    <TouchableOpacity onPress={() => setActiveComponent('newOrder')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "33%", padding: RFPercentage(2), backgroundColor: activeComponent === 'newOrder' ? colors.secondary : null }} >
                                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >New Orders</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('confirmed')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "33%", padding: RFPercentage(2), backgroundColor: activeComponent === 'confirmed' ? colors.secondary : null }} >
                                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Confirmed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('taken')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "33%", padding: RFPercentage(2), backgroundColor: activeComponent === 'taken' ? colors.secondary : null }} >
                                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Taken</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                activeComponent === 'newOrder' ?
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}
                                        style={{ marginTop: RFPercentage(3.5) }}
                                        showsVerticalScrollIndicator={false}
                                        data={products.length === 0 ? [{ blank: true }] : products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return !item.taken ?
                                                <TouchableOpacity onPress={() => handlePress(item)} onLongPress={() => handleLongPress(item)} activeOpacity={0.7} style={{
                                                    margin: RFPercentage(1),
                                                    marginLeft: "6%",
                                                    backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                                    // maxHeight: item.blank ? 0 : null,
                                                    width: "100%",
                                                    // height: RFPercentage(20),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showConfirm={true} showTaken={true} showDelete={true} onConfirm={() => handleOrderConfirm(index)} onTaken={() => handleOrderTaken(index)} onDelete={() => handleOrderDelete(index)} details={item} />
                                                    }
                                                </TouchableOpacity> : null
                                        }

                                        }
                                    /> : null
                            }
                            {
                                activeComponent === 'confirmed' ?
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}
                                        style={{ marginTop: RFPercentage(3.5) }}
                                        showsVerticalScrollIndicator={false}
                                        data={products.length === 0 ? [{ blank: true }] : products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return item.confirm ?
                                                <TouchableOpacity onPress={() => handlePress(item)} onLongPress={() => handleLongPress(item)} activeOpacity={0.7} style={{
                                                    margin: RFPercentage(1),
                                                    marginLeft: "6%",
                                                    backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                                    // maxHeight: item.blank ? 0 : null,
                                                    width: "100%",
                                                    // height: RFPercentage(20),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => handleOrderTaken(index)} onDelete={() => handleOrderDelete(index)} details={item} />
                                                    }
                                                </TouchableOpacity> : null
                                        }

                                        }
                                    /> : null
                            }

                            {
                                activeComponent === 'taken' ?
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}
                                        style={{ marginTop: RFPercentage(3.5) }}
                                        showsVerticalScrollIndicator={false}
                                        data={products.length === 0 ? [{ blank: true }] : products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (item.taken && !item.confirm) ?
                                                <TouchableOpacity activeOpacity={0.7} style={{
                                                    margin: RFPercentage(1),
                                                    marginLeft: "6%",
                                                    backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                                    // maxHeight: item.blank ? 0 : null,
                                                    width: "100%",
                                                    // height: RFPercentage(20),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showConfirm={true} showDelete={true} onConfirm={() => handleOrderConfirm(index)} onTaken={() => handleOrderTaken(index)} onDelete={() => handleOrderDelete(index)} details={item} />
                                                    }
                                                </TouchableOpacity> : null
                                        }

                                        }
                                    /> : null
                            }

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

export default RiderScreen;