import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

function OrderCard({ index, title, description, price, image, showConfirm, showTaken, showDelete, onConfirm, onTaken, onDelete }) {
    return (
        <View key={index} style={{ flexDirection: "row", width: "100%", flex: 1 }} >
            <Image resizeMode="cover" source={{ uri: image }} style={{ borderRadius: RFPercentage(1.5), width: "27%", height: "100%" }} />

            <View style={{ flexDirection: "column", width: "60%", margin: RFPercentage(1), marginLeft: RFPercentage(2) }} >
                <View style={{ flexDirection: "row" }} >
                    <Text numberOfLines={1} style={{ marginRight: 10, color: colors.secondary, fontSize: RFPercentage(2.2) }} >{price}</Text>
                    <Text numberOfLines={1} style={{ color: colors.black, fontSize: RFPercentage(2.3) }} >{title}</Text>
                </View>
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(1.8) }} >{description}</Text>

                <View style={{ position: "absolute", bottom: 0, alignItems: "center", marginTop: RFPercentage(1), flexDirection: "row", justifyContent: "space-between" }} >
                    <View style={{ width: showTaken ? "100%" : (showConfirm ? "75%" : "50%"), alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", marginRight: RFPercentage(2) }} >
                        {
                            showConfirm ?
                                <TouchableOpacity onPress={() => onConfirm()} activeOpacity={0.7} style={{ backgroundColor: colors.secondary, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2), color: colors.white }} >Confirm</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            showTaken ?
                                <TouchableOpacity onPress={() => onTaken()} activeOpacity={0.7} style={{ backgroundColor: colors.primary, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2), color: colors.white }} >Taken</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            showDelete ?
                                <TouchableOpacity onPress={() => onDelete()} activeOpacity={0.7} style={{ backgroundColor: colors.danger, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2), color: colors.white }} >Delete</Text>
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}


export default OrderCard;