import React, { useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AlertAsync from "react-native-alert-async";

// Components
import CartCard from '../components/CartCard';

// config
import colors from '../config/colors';
import AppTextButton from '../components/AppTextButton';

function CartScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldProducts, setOldProducts] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [deleteAvailable, setDeleteAvailable] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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
            id: 4,
            title: "Chiken Buger",
            price: "$24",
            description: "This is description of Burgers",
            image: "https://c4.wallpaperflare.com/wallpaper/209/721/107/food-burger-wallpaper-preview.jpg",
        },
        {
            id: 4,
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

    // check if delete button can be enable
    const checkDeleteAvailable = () => {
        const available = products.filter(item => item.toDelete).map(item => item.toDelete).includes(true);
        setDeleteAvailable(available)
    }

    const handleLongPress = (item) => {
        const index = products.indexOf(item);
        let tempProducts = [...products];
        tempProducts[index].toDelete = !tempProducts[index].toDelete;
        setProducts(tempProducts)

        // check if delete button can be enable
        checkDeleteAvailable()
    }

    const handlePress = (item) => {
        const index = products.indexOf(item);
        let tempProducts = [...products];
        tempProducts[index].toDelete = !tempProducts[index].toDelete;
        setProducts(tempProducts)

        // check if delete button can be enable
        checkDeleteAvailable()
    }

    const handleDelete = () => {
        const tempProducts = products.filter(item => !item.toDelete);
        setProducts(tempProducts);

        // disable delte button
        setDeleteAvailable(false)
    }

    const orderNow = async () => {
        const res = await AlertAsync(
            'Order Confirmation',
            'Press Confirm the Order',
            [
                { text: 'Confirm', onPress: () => true },
                { text: 'Cancel', onPress: () => Promise.resolve('no') },
            ],
            {
                cancelable: true,
                onDismiss: () => 'no',
            },
        );

        if (res) {
            console.log(res)
        }
        else {
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.Action color={colors.white} icon="format-align-left" onPress={() => { }} />
                <Appbar.Content color={colors.white} title={`Cart (${products.length})`} />
                <Appbar.Action color={colors.white} icon="account-circle" onPress={() => { }} />
            </Appbar.Header>
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
                                            <CartCard index={index} price={item.price} title={item.title} description={item.description} image={item.image} />
                                        }
                                    </TouchableOpacity>

                                }
                            />

                            <View style={{ backgroundColor: colors.white, alignItems: "center", width: "100%", position: "absolute", bottom: 0, paddingBottom: RFPercentage(4) }} >
                                <View style={{ padding: RFPercentage(2), width: "50%", justifyContent: "space-evenly", flexDirection: "row" }} >
                                    <Text style={{ fontSize: RFPercentage(2.8) }} >Total</Text>
                                    <Text style={{ fontSize: RFPercentage(2.8), fontWeight: "bold" }}>$130</Text>
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