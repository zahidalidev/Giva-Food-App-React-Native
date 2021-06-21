import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

function OrderCard({ showCompletedBtn = false, index, details, showConfirm, showTaken, showDelete, onConfirm, onTaken, onDelete }) {
    return (
        <View key={index} style={{ flexDirection: "row", width: "100%", flex: 1, justifyContent: "center" }} >

            <View style={{ flexDirection: "column", width: "90%", margin: RFPercentage(1) }} >
                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }} >
                    <Text numberOfLines={1} style={{ color: colors.secondary, fontSize: RFPercentage(2.7) }} >Contact Details</Text>
                </View>
                <View style={{ marginLeft: RFPercentage(2), flexDirection: "row" }} >
                    <Text style={{ marginRight: 10, color: colors.black, fontSize: RFPercentage(2.2) }} >{details.contactNumber}</Text>
                    <Text numberOfLines={1} style={{ color: colors.black, fontSize: RFPercentage(2.2) }} >{details.name}</Text>
                </View>
                <Text numberOfLines={1} style={{ marginLeft: RFPercentage(2), color: colors.grey, fontSize: RFPercentage(1.8) }} >{details.address}</Text>
                <View style={{ marginLeft: RFPercentage(2), flexDirection: "row", marginBottom: RFPercentage(1) }} >
                    <Text numberOfLines={1} style={{ marginRight: 10, color: colors.black, fontSize: RFPercentage(2.2) }} >{details.email}</Text>
                    <Text numberOfLines={1} style={{ color: colors.black, fontSize: RFPercentage(2.2) }} >Total: {details.totalPrice}</Text>
                </View>


                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }} >
                    <Text numberOfLines={1} style={{ color: colors.secondary, fontSize: RFPercentage(2.7) }} >Details</Text>
                </View>
                {
                    details.products.map((item, index) =>
                        <View key={index} style={{ marginLeft: RFPercentage(2), flexDirection: "row", width: "100%", alignItems: "center" }} >
                            <Text numberOfLines={1} style={{ marginRight: 10, color: colors.black, fontSize: RFPercentage(2.2) }} >{item.title}</Text>
                            <Text numberOfLines={1} style={{ marginRight: 10, color: colors.black, fontSize: RFPercentage(2.2) }} >{item.price}</Text>
                            <Text numberOfLines={1} style={{ color: colors.black, fontSize: RFPercentage(2.2) }} >Quantity: {item.quantity}</Text>
                        </View>
                    )
                }

                <View style={{ alignItems: "center", marginTop: RFPercentage(1.5), flexDirection: "row", justifyContent: "space-between" }} >
                    <View style={{ width: showTaken ? "100%" : (showConfirm ? "75%" : "50%"), width: showCompletedBtn ? "70%" : null, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", marginRight: RFPercentage(2) }} >
                        {
                            showConfirm ?
                                <TouchableOpacity onPress={() => onConfirm()} activeOpacity={0.7} style={{ backgroundColor: colors.secondary, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2.3), color: colors.white }} >Confirm</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            showCompletedBtn ?
                                <TouchableOpacity onPress={() => onDelete()} activeOpacity={0.7} style={{ backgroundColor: colors.secondary, borderWidth: 1, padding: RFPercentage(0.8), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2.3), color: colors.white }} >Mark Complete</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            showTaken ?
                                <TouchableOpacity onPress={() => onTaken()} activeOpacity={0.7} style={{ backgroundColor: colors.primary, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2.3), color: colors.white }} >Taken</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            showDelete ?
                                <TouchableOpacity onPress={() => onDelete()} activeOpacity={0.7} style={{ backgroundColor: colors.danger, borderWidth: 1, padding: RFPercentage(0.4), paddingLeft: RFPercentage(1.4), paddingRight: RFPercentage(1.4), borderColor: colors.lightGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2.3), color: colors.white }} >Delete</Text>
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