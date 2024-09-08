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

export const fetchStats = async () => {


    try {
        const response = await apiClient.get('/api/fetch/stats', {
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};


export const fetchAnimes = async (filter, sort, page) => {
    try {
        const response = await apiClient.get('/api/fetch/list/anime', {
            params: {
                page,
                filter,
                sort,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};


export const fetchAnime = async (id) => {
    try {
        const response = await apiClient.get(`/api/fetch/anime/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};


export const getToken = () => {
    return Cookies.get('token');
};
