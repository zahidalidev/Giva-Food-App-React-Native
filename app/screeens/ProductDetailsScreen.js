import React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, View, Dimensions, Text, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AntDesign } from "@expo/vector-icons"

// components
import AppTextButton from '../components/AppTextButton';

// confgi
import colors from '../config/colors';

const height = Dimensions.get('window').height;

function ProductDetailsScreen(props) {
    const [product, setProduct] = useState(
        {
            id: 0,
            title: "Cheese Burger Burger",
            price: "$23",
            description: "This is description of Burgers again this is description of Burgers again this is description of Burgers",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        }
    )

    const addToCart = () => {
        props.navigation.navigate('cartScreen')
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image resizeMode="cover" style={{ width: "100%", height: (height / 2) - RFPercentage(5) }} source={{ uri: product.image }} />

            <TouchableOpacity onPress={() => props.navigation.navigate('productScreen')} style={{ position: "absolute", top: RFPercentage(5), right: RFPercentage(3) }} >
                <AntDesign name="close" size={RFPercentage(3.3)} color={colors.white} />
            </TouchableOpacity>

            <View style={{ marginTop: RFPercentage(-6), borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7), flex: 1, width: "100%", backgroundColor: colors.white }} >
                <View style={{ marginTop: RFPercentage(3), flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ color: colors.black, fontSize: RFPercentage(7), fontWeight: Platform.OS === 'android' ? "bold" : '300' }} >
                        {product.price}
                    </Text>

                    <Text style={{ marginTop: RFPercentage(2), width: "80%", color: colors.black, fontSize: RFPercentage(4) }} >
                        {product.title}
                    </Text>
                    <Text style={{ width: "80%", marginTop: RFPercentage(0.5), color: colors.grey, fontSize: RFPercentage(2.3) }} >
                        {product.description}
                    </Text>

                </View>

                <View style={{ position: "absolute", bottom: RFPercentage(6), width: "100%", alignItems: "center" }} >
                    <AppTextButton
                        width="80%"
                        name="Add to CART"
                        borderRadius={RFPercentage(1.3)}
                        backgroundColor={colors.secondary}
                        onSubmit={() => addToCart()}
                    />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%"
    },
})

export default ProductDetailsScreen;