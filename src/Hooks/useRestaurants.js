import { useEffect, useState } from "react";
import yelp from '../API/YELPApi';
import GetLocation from 'react-native-get-location';

export default () => {
    const [getLocation, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const searchApi = async (searchTerm, locations) => {
        setIsLoading(true)
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    latitude: locations.latitude,
                    longitude: locations.longitude,
                    categories: 'food,burgers,pizza,friterie,pasta,desserts,churros,coffee,tea,cupcakes,donuts,gelato,juicebars,smoothies,icecream,tortillas,italian,indian,chinese',
                }
            });
            setRestaurants(response.data.businesses);
            setIsLoading(false)

        } catch (err) {
            setErrorMessage('Something went wrong, check your network enable geo-location and reload app');
        }
    }

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            setLocation(location)
            searchApi('burger', location);
        }).catch(error => {
            setErrorMessage('Something went wrong, check your network, enable geo-location and reload app');
        })
    }, [])
    return [searchApi, restaurants, errorMessage, isLoading, getLocation];
}