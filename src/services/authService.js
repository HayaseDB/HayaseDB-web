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

export const register = async (email, password) => {
    try {
        const response = await apiClient.post('/user/register', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/user/login', { email, password });
        const { token } = response.data;

        Cookies.set('token', token, { expires: 7 });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const getToken = () => {
    return Cookies.get('token');
};

export const checkToken = async () => {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const response = await apiClient.get('/user/check', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return false;
    }
};
