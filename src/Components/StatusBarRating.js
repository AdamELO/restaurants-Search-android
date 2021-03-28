import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function StatusBarRating({ color, rating, percent }) {
    return (
        <View style={styles.main_container}>
            <Text style={styles.text_rating}>{rating}</Text>
            <View style={styles.main_bar}>
                <View style={[styles.color_bar, { backgroundColor: color, width: percent() !==  '0%' ? percent() : 1 }]}></View>
            </View>
            <Text style={styles.text_percent}>{percent() != '0%' ? percent() : ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main_bar: {
        flex: 8,
        height: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 4
    },
    color_bar: {
        height: 10,
        borderRadius: 4
    },
    text_rating: {
        flex: 1,
        textAlign: 'center',
        color: 'gray',
        fontStyle: 'italic'
    },
    text_percent: {
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic'
    }

})