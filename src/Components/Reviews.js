import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, FlatList, Linking, Button } from 'react-native';
import yelp from '../API/YELPApi';
import ReviewItem from "./ReviewItems";
import BarRating from "./StatusBarRating";
import RatingStar from './RatingStar';

export default function Reviews({ route }) {
    const { idResto } = route.params;
    const { ratingTotal } = route.params;
    const [reviewsInfo, setReviewsInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getReviewsInfo = async (id) => {
        try {
            const response = await yelp.get(`/${id}/reviews`);
            setReviewsInfo(response.data);
            setIsLoading(false);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getReviewsInfo(idResto);
    }, [])


    if (!reviewsInfo) {
        if (isLoading) {
            return (<View style={styles.loading}><ActivityIndicator color='purple' size='large' /></View>)
        }
    }

    function ratingsPercent(paramRatingColorBar) {
        let arrayOfRatings = [];
        let reviewsInfoFilteredByRating = reviewsInfo.reviews.filter((el) => el.rating === paramRatingColorBar)
        reviewsInfoFilteredByRating.forEach(el => {
            arrayOfRatings.push(el.rating);
        });
        const total = reviewsInfo.reviews.length;
        const percent = `${Math.round((arrayOfRatings.length / total) * 100)}%`;
        return percent;
    }

    function allReviews(url) {
        const supported = Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        }

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.cardRating}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> {Number.isInteger(ratingTotal) ? ratingTotal + '.0' : ratingTotal} </Text>
                        <RatingStar rating={ratingTotal} ratingStyle={{ margin: 5 }} />
                        <Text style={{ fontSize: 15, color: 'gray' }}>{reviewsInfo.total > 2 ? 'based on the 3 most relevant reviews' : reviewsInfo.total === 2 ? 'based on the 2 most relevant reviews' : 'based on 1 review'}</Text>
                    </View>
                    <View>
                        <BarRating color='green' rating='5' percent={() => ratingsPercent(5)} />
                        <BarRating color='limegreen' rating='4' percent={() => ratingsPercent(4)} />
                        <BarRating color='gold' rating='3' percent={() => ratingsPercent(3)} />
                        <BarRating color='orange' rating='2' percent={() => ratingsPercent(2)} />
                        <BarRating color='red' rating='1' percent={() => ratingsPercent(1)} />
                    </View>
                </View>
                <FlatList
                    data={reviewsInfo.reviews}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ReviewItem review={item} />
                    )}
                />
                <Button
                    title='See complete reviews on browser'
                    color='#134F5C'
                    onPress={() => allReviews(reviewsInfo.reviews[0].url)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    cardRating: {
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10
    },
})