import React, { useState, useEffect, useRef } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Components
import AppTextInput from '../components/AppTextInput';
import banner from "../../assets/images/banner.png"
import CategoryCard from "../components/CategoryCard";

// config
import colors from '../config/colors';
import { getAllNewCategories, getCategories } from '../services/CategoryServices';
import { getProducts } from "../services/ProductServices";
// import GetSqlDate from '../components/commmon/GetSqlDate';

const windowWidth = Dimensions.get('window').width;

function HomeScreen(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [currentUser, setCurrentUser] = useState({})
    const [categories, setCategories] = useState([]);

    // to listen the responce of notification
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notification, setNotification] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllCategories();
        getAllProducts()
        setRefreshing(false);
    }, []);

    const handleSearch = () => {
        props.navigation.navigate('productScreen', { filterProducts: allProducts })
    }

    const getAllProducts = async () => {
        try {
            setActivityIndic(true)
            let res = await getProducts();
            setAllProducts(res)

        } catch (error) {
            // toastify.error("Categories not found please add them");
            console.log("Categories found: ", error)
        }
        setRefreshing(false)
        setActivityIndic(false);
    }


    const getAllCategories = async () => {
        try {
            setActivityIndic(true)
            let categoryRef = await getCategories();

            // let tempCategories = [...categories];
            const observer = categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let res = await getAllNewCategories()
                    setCategories(res)
                });
            });
        } catch (error) {
            // toastify.error("Categories not found please add them");
            console.log("Categories found: ", error)
        }
        setRefreshing(false)
        setActivityIndic(false);
    }

    const getUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                console.log("user: ", user)
                setCurrentUser(user)
            } else {
                setCurrentUser({})
            }
        } catch (error) {
            console.log("Home user name error: ", error)
            setCurrentUser({})
        }
    }

    useEffect(() => {
        getAllCategories();
        getAllProducts();
        getUser()



        // to listen the responce of notification
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("response notification ");
            props.navigation.navigate("riderScreen")
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('product');
            props.navigation.navigate('loginScreen')
        } catch (error) {
            alert("Logout Error")
        }
    }

    const handleProfiles = async () => {
        try {
            let currentUser = await AsyncStorage.getItem('user');
            currentUser = JSON.parse(currentUser);
            if (currentUser) {
                if (currentUser.role === 'admin') {
                    props.navigation.navigate('adminScreen')
                } else if (currentUser.role === 'rider') {
                    props.navigation.navigate('riderScreen')
                } else if (currentUser.role === 'restaurant') {
                    props.navigation.navigate('resturentScreen')
                } else {
                    props.navigation.navigate('profileScreen')
                }
            }

        } catch (error) {

        }
    }

    const handleProductCategory = (label) => {
        let tempProducts = [...allProducts];
        const filterProducts = tempProducts.filter(item => item.category == label);
        try {
            props.navigation.navigate('productScreen', { filterProducts: filterProducts })
        } catch (error) {
            console.log("Handle Product Category Error: ", error)
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.Action onPress={() => handleProfiles()} color={colors.white} icon="account-circle" />
                <Appbar.Content color={colors.white} title="Home" />
                <Appbar.Action onPress={() => props.navigation.navigate('cartScreen')} color={colors.white} icon="cart" />
                <Appbar.Action onPress={() => handleLogout()} color={colors.white} icon="import" />
            </Appbar.Header>
            <View style={styles.container}>

                {/* Top container */}
                <View style={{ width: windowWidth, backgroundColor: colors.primary, height: RFPercentage(28), justifyContent: 'flex-start', alignItems: "center" }} >
                    <View style={{ marginTop: RFPercentage(2), flexDirection: 'row', width: "90%", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "column", width: "60%", marginTop: RFPercentage(3.5) }} >
                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(4), color: colors.white }} >
                                Hi, {currentUser.name}
                            </Text>
                            <Text style={{ fontSize: RFPercentage(2.2), color: colors.white }}>
                                Choose the food you love and order !
                            </Text>
                        </View>
                        <Image style={{ width: RFPercentage(15), height: RFPercentage(15) }} source={banner} />
                    </View>
                </View>

                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            {/* Search feilds */}
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(5) }} >
                                <View style={{ width: "90%" }} >
                                    <AppTextInput
                                        placeHolder="Search for food"
                                        width="100%"
                                        value={searchValue}
                                        onChange={(text) => handleSearch()}
                                        rightIcon="magnify"
                                        rightFunction={() => handleSearch()}
                                        elevation={1}
                                        height={RFPercentage(6.51)}
                                        startEdit={() => handleSearch()}
                                    />
                                </View>
                            </View>

                            {/* Categories */}
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />}
                                style={{ marginTop: RFPercentage(5) }}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={categories.length === 0 ? [{ blank: true }] : categories}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => handleProductCategory(item.label)} activeOpacity={0.9} style={{
                                        margin: RFPercentage(1),
                                        marginBottom: RFPercentage(1.5),
                                        marginRight: RFPercentage(2),
                                        backgroundColor: "white",
                                        maxHeight: item.blank ? 0 : null,
                                        shadowColor: '#b5b5b5',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 3,
                                        elevation: 7,
                                        borderRadius: RFPercentage(2),
                                        width: RFPercentage(21), height: RFPercentage(21),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                    }} >
                                        {item.blank ? null :
                                            <CategoryCard index={index} title={item.label} image={item.ImageUrl} />
                                        }
                                    </TouchableOpacity>

                                }
                            />

                        </View>

                    </>
                }
            </View >
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
    loginButton: { marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }
})

export default HomeScreen;