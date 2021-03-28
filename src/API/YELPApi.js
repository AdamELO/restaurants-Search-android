import axios from 'axios';
const API_TOKEN = "JKHGf3qIG6hfb4kMd3YAmEDaX_GryIFVBwNlDRQ9INetZ6Y9Fp0c3dCexn1A7GW53R8-v8C8nGoBm8suHgUNvJ820HzyLvuRSMRfq2VfRPJ_1GhYd_FktTvMzjlWYHYx";

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }
})