import axios from 'axios';

const API_URL = 'https://64b4c8450efb99d862694609.mockapi.io/tree/items';

export default {
    async GetALL() {
        const response = await axios.get(API_URL);
        return response.data;
    }
}