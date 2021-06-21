import React, { useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// config
import colors from '../config/colors';
import AppTextInput from '../components/AppTextInput';
import OrderCard from '../components/OrderCard';

// new Order = !item.taken
// taken = taken && !confirm
// confirm = item.confirm

function RiderScreen(props) {
    const [oldProducts, setOldProducts] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeComponent, setActiveComponent] = useState('newOrder');

    const [products, setProducts] = useState([
        {
            id: 0,
            name: "Zahid Ali",
            address: "this is address",
            email: "user1@gmail.com",
            contactNumber: "+012838883839",
            totalPrice: 127,
            confirm: false,
            taken: false,
            products: [
                {
                    price: "$67",
                    quantity: 1,
                    title: "Pizza2"
                },
                {
                    price: "$20",
                    quantity: 3,
                    title: "Burger2"
                },
            ]
        }
    ]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        // getIngredients();
    }, []);

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
                                                        <OrderCard index={index} showConfirm={true} showTaken={true} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} details={item} />
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
                                                    height: RFPercentage(20),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} details={item} />
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
                                                    height: RFPercentage(20),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showConfirm={true} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} details={item} />
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