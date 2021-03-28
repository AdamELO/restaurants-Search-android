import React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function RatingStar({ rating, ratingStyle }) {

    let arrayStar = ['star-o', 'star-o', 'star-o', 'star-o', 'star-o'];

    for (let i = 0; i < rating; i++) {
        if (i === Math.floor(rating)) {
            if (Number.isInteger(rating)) {
                arrayStar[i] = 'star'
            } else {
                arrayStar[i] = 'star-half-full'
            }
        } else {
            arrayStar[i] = 'star'
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {arrayStar.map((icon, i) => {
                return (
                    <FontAwesome style={ratingStyle || null} key={i} name={icon} color='orange' size={18} />
                )
            })}
        </View>
    )
}