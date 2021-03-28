import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, LogBox, ActivityIndicator, Linking } from 'react-native';
import yelp from '../API/YELPApi';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from './CarouselInfoResto';
import RatingStar from './RatingStar';
import { useSelector, useDispatch } from 'react-redux';
import { showLocation } from 'react-native-map-link'

function RestaurantsShow({ navigation, route }) {
    const { idResto } = route.params;
    const [restoInfo, setRestoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const likeRestaurant = useSelector(state => state.likeRestaurant);
    const hateRestaurant = useSelector(state => state.hateRestaurant);
    const dispatch = useDispatch();

    const getResult = async (id) => {
        try {
            const response = await yelp.get(`/${id}`);
            setRestoInfo(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    };


    useEffect(() => {
        getResult(idResto);
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    if (!restoInfo) {
        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color='purple' size='large' />
                </View>
            )
        }
    }

    function openMaps() {
        if (restoInfo.hasOwnProperty('location')) {
            showLocation({
                latitude: restoInfo.coordinates.latitude,
                longitude: restoInfo.coordinates.longitude
            })
        }else{
            alert('No loction has been found')
        }
    }


    const displayBtnMaps = () => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => openMaps()}
            >
                <FontAwesome5 name='map-marked-alt' size={16} color='gray' />
                <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                    <Text>{restoInfo.location.address1},</Text>
                    <Text>{restoInfo.location.zip_code} {restoInfo.location.city}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    function phoneCall(url) {
        if (restoInfo.display_phone !== '') {
            const supported = Linking.canOpenURL(url);
            if (supported) {
                Linking.openURL(`tel:${url}`);
            }
        }

    }

    const displayBtnPhoneCall = () => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => phoneCall(restoInfo.display_phone)}
            >
                <FontAwesome5 name='phone-alt' size={20} color='green' />
                <Text style={{ marginLeft: 8 }}>{restoInfo.display_phone || 'Number not found'}</Text>
            </TouchableOpacity>
        )
    }

    const displayBtnReviews = () => {
        return (
            <TouchableOpacity
                style={styles.btnReview}
                onPress={() => navigation.navigate('Reviews', { idResto: idResto, ratingTotal: restoInfo.rating })}
            >
                <Text style={{ color: '#134F5C', fontSize: 18 }}>See Reviews</Text>
            </TouchableOpacity>
        )
    }

    const isOpen = () => {
        if (restoInfo.hasOwnProperty('hours')) {
            if (restoInfo.hours[0].is_open_now) {
                return (
                    <View style={[styles.open, { backgroundColor: '#E7EFF1' }]}>
                        <FontAwesome5 name='door-open' color='green' size={30} />
                    </View>
                )
            } else {
                return (
                    <View style={[styles.open, { backgroundColor: '#fcc2bd' }]}>
                        <FontAwesome5 name='door-closed' color='red' size={30} />
                    </View>
                )
            }
        } else {
            return (
                <View style={[styles.open, { backgroundColor: '#c7c5c5' }]}>
                    <FontAwesome5 name='question' color='grey' size={30} />
                </View>
            )
        }


    }


    const cardInfo = () => {
        return (
            <View style={styles.card_container}>
                {isOpen()}
                <View style={{ flex: 3, paddingVertical: 15 }}>
                    <View style={styles.info}>
                        <View style={{ flex: 3 }}>
                            <RatingStar rating={restoInfo.rating} ratingStyle={{ marginHorizontal: 5 }} />
                        </View>
                        <View style={styles.like}>
                            <TouchableOpacity
                                onPress={() => toggleLike()}
                            >
                                {heart()}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => toggleHate()}
                            >
                                {poop()}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.headTitle}>{restoInfo.name}</Text>
                    {displayBtnMaps()}
                    {displayBtnPhoneCall()}
                </View>
            </View>
        )
    }


    function toggleLike() {
        const action = { type: "heart", value: restoInfo }
        dispatch(action)
    }
    function toggleHate() {
        const action = { type: "poop", value: restoInfo }
        dispatch(action)
    }

    const heart = () => {
        if (hateRestaurant.findIndex(item => item.id === restoInfo.id) !== -1) {
            return null
        } else {
            if (likeRestaurant.findIndex(item => item.id === restoInfo.id) !== -1) {
                return <FontAwesome name='heart' size={20} color='red' />
            } else {
                return <FontAwesome name='heart' size={20} color='#f1f1f1' />
            }
        }
    }
    const poop = () => {
        if (likeRestaurant.findIndex(item => item.id === restoInfo.id) !== -1) {
            return null
        } else {
            if (hateRestaurant.findIndex(item => item.id === restoInfo.id) !== -1) {
                return <FontAwesome5 name='poop' size={20} color='brown' />
            } else {
                return <FontAwesome5 name='poop' size={20} color='#f1f1f1' />
            }
        }
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? <View style={styles.loading}><ActivityIndicator color='purple' size='large' /></View> : null}
            {cardInfo()}
            <Carousel photos={restoInfo.photos} />
            {displayBtnReviews()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headTitle: {
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 3
    },
    button: {
        flexDirection: 'row',
        margin: 8,
        alignItems: 'center'
    },
    btnReview: {
        alignItems: "center",
        padding: 20,
        margin: 10,
        width: 240,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#C5E1E5',
        borderRadius: 10
    },
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
    card_container: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row'
    },
    open: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    }
})

export default RestaurantsShow