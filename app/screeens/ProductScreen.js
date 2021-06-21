import React, { useEffect, useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// config
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import AppTextInput from '../components/AppTextInput';


function ProductScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldProducts, setOldProducts] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);

    const getFilteredProducts = async () => {
        try {
            if (props.route.params.filterProducts) {
                setProducts(props.route.params.filterProducts)
                setOldProducts(props.route.params.filterProducts)
            }
        } catch (error) {

        }
    }

    const handleSearch = () => {
        const tempProducts = [...oldProducts];
        const searhedProducts = tempProducts.filter(item => item.title.search(searchValue) >= 0)
        setProducts(searhedProducts)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFilteredProducts()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        onRefresh()
    }, [props.route.params])

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title="Order Food You Love" />
                {/* <Appbar.Action color={colors.white} icon="account-circle" onPress={() => { }} /> */}
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
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(1) }} >
                                <View style={{ width: "90%" }} >
                                    <AppTextInput
                                        autoFocus={true}
                                        placeHolder="Search for food"
                                        width="100%"
                                        value={searchValue}
                                        onChange={(text) => setSearchValue(text)}
                                        rightIcon="magnify"
                                        rightFunction={() => handleSearch()}
                                        elevation={1}
                                        borderWidth={0.4}
                                        height={RFPercentage(6.51)}
                                    />
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

export default ProductScreen;