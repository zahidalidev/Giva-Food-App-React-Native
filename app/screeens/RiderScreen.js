import React, { useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// config
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import AppTextInput from '../components/AppTextInput';


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
        },
        {
            id: 1,
            title: "Bbq Burger",
            price: "$20",
            description: "This is description of Burgers",
            image: "https://wallpaperaccess.com/full/1312729.jpg",
        },
        {
            id: 2,
            title: "Smoky Burger",
            price: "$30",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/771/93/160/food-burger-hd-wallpaper-preview.jpg",
        },
        {
            id: 3,
            title: "Grill Burger",
            price: "$25",
            description: "This is description of Burgers",
            image: "https://images7.alphacoders.com/817/817988.jpg",
        },
        {
            id: 4,
            title: "Chiken Buger",
            price: "$24",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/209/721/107/food-burger-wallpaper-preview.jpg",
        },
        {
            id: 5,
            title: "Bbq Burger",
            price: "$20",
            description: "This is description of Burgers",
            image: "https://wallpaperaccess.com/full/1312729.jpg",
        },
        {
            id: 6,
            title: "Smoky Burger",
            price: "$30",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/771/93/160/food-burger-hd-wallpaper-preview.jpg",
        },
        {
            id: 7,
            title: "Grill Burger",
            price: "$25",
            description: "This is description of Burgers",
            image: "https://images7.alphacoders.com/817/817988.jpg",
        },
        {
            id: 8,
            title: "Chiken Buger",
            price: "$24",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/209/721/107/food-burger-wallpaper-preview.jpg",
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

                            {/* Search feilds */}
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

                            {/* Products */}
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />}
                                style={{ marginTop: RFPercentage(3) }}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={products.length === 0 ? [{ blank: true }] : products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('productDetailsScreen', { item: item })} activeOpacity={0.9} style={{
                                        margin: RFPercentage(1),
                                        marginRight: RFPercentage(2),
                                        marginBottom: 0,
                                        backgroundColor: "white",
                                        maxHeight: item.blank ? 0 : null,
                                        width: RFPercentage(21), height: RFPercentage(21),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                    }} >
                                        {item.blank ? null :
                                            <ProductCard index={index} price={item.price} title={item.title} description={item.description} image={item.image} />
                                        }
                                    </TouchableOpacity>

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

export default RiderScreen;