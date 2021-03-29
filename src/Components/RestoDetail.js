import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { height: viewportHeight } = Dimensions.get('window');

function RestoDetail({ resto, isHeart, isPoop }) {

    const likeOrHate = () => {
        if (isHeart) {
            return (
                <Text style={styles.icon}>
                    <FontAwesome name='heart' size={18} color='#fa3c6f' />
                </Text>
            )
        } else if (isPoop) {
            return (
                <Text style={styles.icon}>
                    <FontAwesome5 name='poop' size={18} color='brown' />
                </Text>
            )
        } else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={resto.hasOwnProperty('image_url') ? { uri: resto.image_url } : require('../Images/noimg.png')}
                style={styles.img}
            />
            <Text style={styles.title}>{resto.name}</Text>
            <View style={styles.body}>
                <Text style={styles.textBody}>{resto.rating} <FontAwesome name='star' color='orange' size={14} /></Text>
                <Text style={styles.textBody}>{resto.review_count} Reviews</Text>
                {likeOrHate()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingBottom: 20,
    },
    img: {
        height: viewportHeight * 0.24,
    },
    title: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
        paddingVertical: 5,
        alignSelf: 'center'
    },
    body: {
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textBody: {
        color: 'black',
        fontStyle: 'italic'
    },
    icon: {
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default RestoDetail