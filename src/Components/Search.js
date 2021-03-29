import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import SearchBar from './SearchBar';
import useRestaurants from '../Hooks/useRestaurants';
import RestoList from './RestaurantsList';

const Search = ({ navigation }) => {

    const [searchedText, setSearchedText] = useState('');
    const [searchApi, restaurants, errorMessage, isLoading, getLocation] = useRestaurants();


    const filterRestaurantsByPrice = (price) => {
        return restaurants.filter((result) => {
            return result.price === price
        }).sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
    };



    return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
            <SearchBar searchApi={() => searchApi(searchedText, getLocation)} text={searchedText} onTermChange={setSearchedText} />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {isLoading ? <View style={styles.loading}><ActivityIndicator color='purple' size='large' /></View> : null}
            <ScrollView showsVerticalScrollIndicator={false}>
                <RestoList restaurants={filterRestaurantsByPrice('€')} title="Cheap" navigation={navigation} />
                <RestoList restaurants={filterRestaurantsByPrice('€€')} title="Bit Pricier" navigation={navigation} />
                <RestoList restaurants={filterRestaurantsByPrice('€€€')} title="Expensive" navigation={navigation} />
            </ScrollView>
        </View>
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
    }
})

export default Search;