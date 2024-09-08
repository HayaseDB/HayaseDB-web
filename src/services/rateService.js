import axios from 'axios';
import Cookies from 'js-cookie';

const TIMEOUT = 10000;

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: TIMEOUT
});

const handleAxiosError = (error) => {
    if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please try again later.';
    }
    if (error.code === 'ECONNREFUSED') {
        return 'Unable to connect to the server.';
    }
    return error.response?.data?.message || 'An error occurred. Please try again.';
};


export const updateRating = async (animeId, rating) => {
    try {
        const token = Cookies.get('token');
        const response = await apiClient.post('/api/modify/post/rate', null, {
            params: {
                animeId,
                rating
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};