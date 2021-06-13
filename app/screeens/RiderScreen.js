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
            title: "Cheese Burger Burger",
            price: "$23",
            description: "This is description of Burgers",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            confirm: true,
            taken: true
        },
        {
            id: 1,
            title: "Bbq Burger",
            price: "$20",
            description: "This is description of Burgers",
            image: "https://wallpaperaccess.com/full/1312729.jpg",
            confirm: false,
            taken: true
        },
        {
            id: 2,
            title: "Smoky Burger",
            price: "$30",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/771/93/160/food-burger-hd-wallpaper-preview.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 3,
            title: "Grill Burger",
            price: "$25",
            description: "This is description of Burgers",
            image: "https://images7.alphacoders.com/817/817988.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 4,
            title: "Chiken Buger",
            price: "$24",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/209/721/107/food-burger-wallpaper-preview.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 5,
            title: "Bbq Burger",
            price: "$20",
            description: "This is description of Burgers",
            image: "https://wallpaperaccess.com/full/1312729.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 6,
            title: "Smoky Burger",
            price: "$30",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/771/93/160/food-burger-hd-wallpaper-preview.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 7,
            title: "Grill Burger",
            price: "$25",
            description: "This is description of Burgers",
            image: "https://images7.alphacoders.com/817/817988.jpg",
            confirm: false,
            taken: false
        },
        {
            id: 8,
            title: "Chiken Buger",
            price: "$24",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/209/721/107/food-burger-wallpaper-preview.jpg",
            confirm: false,
            taken: false
        },
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
                <Appbar.Action color={colors.white} icon="format-align-left" onPress={() => { }} />
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
                                                    height: RFPercentage(12),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showConfirm={true} showTaken={true} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} price={item.price} title={item.title} description={item.description} image={item.image} />
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
                                                    height: RFPercentage(12),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} price={item.price} title={item.title} description={item.description} image={item.image} />
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
                                                <TouchableOpacity onPress={() => handlePress(item)} onLongPress={() => handleLongPress(item)} activeOpacity={0.7} style={{
                                                    margin: RFPercentage(1),
                                                    marginLeft: "6%",
                                                    backgroundColor: item.toDelete ? "rgba(0, 129, 105, 0.1)" : "white",
                                                    // maxHeight: item.blank ? 0 : null,
                                                    width: "100%",
                                                    height: RFPercentage(12),
                                                    flexDirection: "column",
                                                }} >
                                                    {item.blank ? null :
                                                        <OrderCard index={index} showConfirm={true} showDelete={true} onConfirm={() => console.log("confirm")} onTaken={() => console.log('taken')} onDelete={() => console.log('delete')} price={item.price} title={item.title} description={item.description} image={item.image} />
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