import React from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RestoDetail from './RestoDetail';
import { useSelector } from 'react-redux';
const { width: viewportWidth } = Dimensions.get('window');

export default function CarouselInfoResto({ restaurants, navigation }) {

    const likeRestaurant = useSelector(state => state.likeRestaurant);
    const hateRestaurant = useSelector(state => state.hateRestaurant);

    function displayInfo(item) {
        navigation.navigate('Detail', { idResto: item.id })
    }


    return (
        <ScrollView>
            <View>
                <Carousel
                    data={restaurants}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => displayInfo(item)}>
                                <RestoDetail isHeart={(likeRestaurant.findIndex(el => el.id === item.id) !== -1) ? true : false} isPoop={(hateRestaurant.findIndex(el => el.id === item.id) !== -1) ? true : false} resto={item} />
                            </TouchableOpacity>
                        )
                    }}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth * 0.7}
                    activeSlideAlignment={'start'}
                />
            </View>
        </ScrollView>
    )
}
