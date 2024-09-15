import axios from 'axios';
import Cookies from 'js-cookie';

const TIMEOUT = 10000;

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
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



export const requestAnimeChange = async (animeId, formData) => {
    try {

        const response = await apiClient.post(`/api/modify/request/create/${animeId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};



export const createAnime = async (formData) => {
    try {
        const response = await apiClient.post('/api/modify/post/anime', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        console.error('Error creating anime:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const fetchAnimes = async (filter, sort, page, pageSize) => {
    try {
        const response = await apiClient.get('/api/fetch/list/anime', {
            params: {
                page,
                filter,
                sort,
                details: false,
                pageSize
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching animes:', error);
        throw new Error('Failed to fetch animes');
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
