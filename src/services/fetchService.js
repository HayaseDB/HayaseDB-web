import axios from 'axios';
import Cookies from 'js-cookie';

const TIMEOUT = 10000;

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
    },
});

const handleAxiosError = (error) => {
    console.error('Error details:', error);
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return 'Bad request. Please check your input and try again.';
            case 401:
                return 'Unauthorized. Please log in again.';
            case 403:
                return 'Forbidden. You do not have permission to access this resource.';
            case 404:
                return 'Resource not found. Please check the URL and try again.';
            case 500:
                return 'Server error. Please try again later.';
            default:
                return 'An error occurred. Please try again.';
        }
    } else if (error.request) {
        return 'No response received from the server. Please try again later.';
    } else {
        return 'An error occurred while setting up the request. Please try again.';
    }
};

export const fetchStats = async () => {
    try {
        const response = await apiClient.get('/api/fetch/stats');
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
