import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

function CategoryCard({ index, title, image }) {
    const backColors = [
        "#d50e64",
        "#85bfff",
        "#f7ca6f",
        "#65f78e"
    ]
    return (
        <View key={index} style={{ borderRadius: 20, backgroundColor: backColors[index % backColors.length], padding: RFPercentage(2), flex: 1, width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
            <Image resizeMode="center" source={{ uri: image }} style={{ width: "70%", height: "70%", alignItems: 'center', justifyContent: 'center' }} />
            <Text style={{ color: colors.white, fontSize: RFPercentage(2.4) }} >{title}</Text>
        </View>
    );
}


export default CategoryCard;