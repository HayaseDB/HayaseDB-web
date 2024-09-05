import axios from 'axios';
import { getToken } from './authService';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000
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

const getAuthHeader = () => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    return { Authorization: `Bearer ${token}` };
};

export const createApiKey = async (title) => {
    try {
        const response = await apiClient.post('/user/key/create', { title }, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const listApiKeys = async () => {
    try {
        const response = await apiClient.get('/user/key/list', {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const validateApiKey = async (keyId) => {
    try {
        const response = await apiClient.post('/user/key/validate', { keyId }, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const regenerateApiKey = async (keyId) => {
    try {
        const response = await apiClient.post('/user/key/regenerate', { keyId }, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const revokeApiKey = async (keyId) => {
    try {
        const response = await apiClient.delete('/user/key/revoke', {
            data: { keyId },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};
