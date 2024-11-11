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


export const fetchDatabaseStats = async () => {
    try {
        const response = await apiClient.get('/metrics/database');
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const fetchInstanceInfo = async () => {
    try {
        const response = await apiClient.get('/metrics/instance');
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const fetchHayaseDBMetrics = async () => {
    try {
        const response = await apiClient.get('/metrics/hayasedb');
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const getToken = () => {
    return Cookies.get('token');
};
