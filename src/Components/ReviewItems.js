import React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';
import RatingStar from './RatingStar';
import moment from 'moment';


export default function Reviews({ review }) {

    return (
        <View style={styles.cardReview}>
            <View style={{ flexDirection: 'row', flex: 1, marginVertical: 15 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styles.imgUser} source={review.user.image_url ? { uri: review.user.image_url } : require('../Images/avatar.png')} />
                </View>
                <View style={styles.userName_main}>
                    <Text style={styles.userName}>{review.user.name}</Text>
                    <Text style={styles.userName}><RatingStar rating={review.rating} ratingStyle={{ margin: 2 }} /></Text>
                </View>
                <View style={styles.fromNow}>
                    <Text>{moment([review.time_created]).fromNow()}</Text>
                </View>
            </View>
            <Text>{review.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardReview: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 10
    },
    imgUser: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    userName_main: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 17
    },
    fromNow: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }

})