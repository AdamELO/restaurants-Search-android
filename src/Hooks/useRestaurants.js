import { useEffect, useState } from "react";
import yelp from '../API/YELPApi';

export default () => {
    const [restaurants, setRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const searchApi = async searchTerm => {
        setIsLoading(true)
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'brussels',
                    categories: 'food,burgers,pizza,friterie,pasta,desserts,churros,coffee,tea,cupcakes,donuts,gelato,juicebars,smoothies,icecream,tortillas,italian,indian,chinese',
                }
            });
            setRestaurants(response.data.businesses);
            setIsLoading(false)
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    }

    useEffect(() => {
        searchApi('burger');
    }, [])
    return [searchApi, restaurants, errorMessage, isLoading];
}