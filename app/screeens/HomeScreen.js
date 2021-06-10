import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import AppTextInput from '../components/AppTextInput';
import banner from "../../assets/images/banner.png"
import CategoryCard from "../components/CategoryCard";

// config
import colors from '../config/colors';
// import { getAllIngredients } from "../services/ingredientsService";
// import GetSqlDate from '../components/commmon/GetSqlDate';

const windowWidth = Dimensions.get('window').width;

function HomeScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldIngredients, setOldIngredients] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [ingredients, setIngredients] = useState([
        {
            id: 0,
            title: "Burgers",
            description: "This is description of Burgers",
            image: "https://freepngimg.com/save/10721-burger-transparent/2400x2132",
        },
        {
            id: 1,
            title: "Pizzas",
            description: "This is description of Pizzas",
            image: "https://www.jing.fm/clipimg/full/208-2088472_pizza-no-background-kebab-pizza-png.png",
        },
        {
            id: 2,
            title: "Fries",
            description: "This is description of Fries",
            image: "https://www.freepnglogos.com/uploads/fries-png/premium-french-fries-photos-7.png",
        },
        {
            id: 3,
            title: "Burgers",
            description: "This is description of Burgers",
            image: "https://freepngimg.com/save/10721-burger-transparent/2400x2132",
        },
    ]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        // getIngredients();
    }, []);

    const handleSearch = () => {
        // let temp = [...oldIngredients];
        // let newIngredients = temp.map((ingredient) => {
        //     if (ingredient.name.includes(searchValue)) {
        //         return ingredient;
        //     }
        // })
        // setIngredients(newIngredients);
    }

    const getIngredients = async () => {
        // try {
        //     setActivityIndic(true)
        //     const userId = await AsyncStorage.getItem('token');
        //     const { data } = await getAllIngredients(userId);
        //     const allIngredients = data.map(item => {
        //         item.expirationDate = GetSqlDate(new Date(item.expirationDate));
        //         return item;
        //     })
        //     setIngredients(allIngredients);
        //     setOldIngredients(allIngredients);
        // } catch (error) {
        //     console.log("Error All ingredients: ", error)
        // }
        // setRefreshing(false)
        // setActivityIndic(false);
    }

    useEffect(() => {
        getIngredients();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            props.navigation.navigate('login')
        } catch (error) {
            alert("Logout Error")
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.Action color={colors.white} icon="format-align-left" onPress={() => { }} />
                <Appbar.Content color={colors.white} title="Home" />
                <Appbar.Action color={colors.white} icon="account-circle" onPress={() => { }} />
            </Appbar.Header>
            <View style={styles.container}>

                {/* Top container */}
                <View style={{ width: windowWidth, backgroundColor: colors.primary, height: RFPercentage(28), justifyContent: 'flex-start', alignItems: "center" }} >
                    <View style={{ marginTop: RFPercentage(2), flexDirection: 'row', width: "90%", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "column", width: "60%", marginTop: RFPercentage(3.5) }} >
                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(4), color: colors.white }} >
                                Hi, Zahid
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
                                        onChange={(text) => setSearchValue(text)}
                                        rightIcon="magnify"
                                        rightFunction={() => handleSearch()}
                                        elevation={1}
                                        height={RFPercentage(6.51)}
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
                                data={ingredients.length === 0 ? [{ blank: true }] : ingredients}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('productScreen', { item: item })} activeOpacity={0.9} style={{
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
                                            <CategoryCard index={index} title={item.title} image={item.image} />
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