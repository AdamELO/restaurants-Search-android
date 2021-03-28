import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Carousel from './CarouselSearchResto'

function RestaurantsList({ title, restaurants, navigation }) {

    if (!restaurants.length) {
        return null;
    }

    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={styles.title}>{title}</Text>
            <Carousel restaurants={restaurants} navigation={navigation} />
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    }

})
export default RestaurantsList