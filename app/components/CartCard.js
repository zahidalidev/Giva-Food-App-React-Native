import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

function CartCard({ index, title, description, price, image }) {
    return (
        <View key={index} style={{ flexDirection: "row", width: "100%", flex: 1 }} >
            <Image resizeMode="cover" source={{ uri: image }} style={{ borderRadius: RFPercentage(1.5), width: "27%", height: "100%" }} />

            <View style={{ flexDirection: "column", width: "60%", margin: RFPercentage(1), marginLeft: RFPercentage(2) }} >
                <Text numberOfLines={1} style={{ color: colors.black, fontSize: RFPercentage(2.3) }} >{title}</Text>
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(1.8) }} >{description}</Text>

                <View style={{ alignItems: "center", marginTop: RFPercentage(1.4), flexDirection: "row", justifyContent: "space-between" }} >
                    <Text numberOfLines={1} style={{ width: "50%", color: colors.secondary, fontSize: RFPercentage(2.2) }} >{price}</Text>
                    <View style={{ width: "50%", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", marginRight: RFPercentage(2) }} >
                        <TouchableOpacity style={{ backgroundColor: colors.lightSecondary, borderWidth: 1, paddingLeft: RFPercentage(1), paddingRight: RFPercentage(1), borderColor: colors.lightGrey }} >
                            <Text style={{ fontSize: RFPercentage(3), color: colors.secondary }} >+</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: RFPercentage(2.5), color: colors.grey }} >5</Text>
                        <TouchableOpacity style={{ backgroundColor: colors.lightSecondary, borderWidth: 1, paddingLeft: RFPercentage(1), paddingRight: RFPercentage(1), borderColor: colors.lightGrey }} >
                            <Text style={{ fontSize: RFPercentage(3), color: colors.secondary, fontWeight: "bold" }} >-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default CartCard;