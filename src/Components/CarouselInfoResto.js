import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width: viewportWidth } = Dimensions.get('window');

export default function CarouselInfoResto({ photos }) {

    let [activeSlide, setActiveSlide] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                data={photos}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Image style={styles.img} source={{ uri: item } || require('../Images/noimg.png')} />
                        </View>
                    )
                }}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                onSnapToItem={(index) => setActiveSlide(index)}
                layout={'stack'}
            />
            {photos.length > 0 ? <Pagination
                dotsLength={photos.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'black'
                }}
                inactiveDotStyle={{
                    backgroundColor: 'gray'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 200,
        marginHorizontal: 30,
        marginVertical: 10
    },
})