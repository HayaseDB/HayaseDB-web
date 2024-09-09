import axios from 'axios';
import Cookies from 'js-cookie';

const TIMEOUT = 10000;

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: TIMEOUT
});

const handleAxiosError = (error) => {
    let message = 'An error occurred. Please try again.';
    let code = error.response?.status || 'UNKNOWN';

    if (error.code === 'ECONNABORTED') {
        message = 'Request timed out. Please try again later.';
    } else if (error.code === 'ECONNREFUSED') {
        message = 'Unable to connect to the server.';
    } else if (error.response?.status === 401) {
        message = 'You need to log in.';
    } else if (error.response?.data?.message) {
        message = error.response.data.message;
    }

    return { message, code };
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
        return response;
    } catch (error) {
        const { message, code } = handleAxiosError(error);
        throw { message, code };
    }
};
