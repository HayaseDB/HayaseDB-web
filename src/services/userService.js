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

export const updateUserCredentials = async (currentPassword, newPassword, username, email) => {
    try {
        const body = {
            currentPassword,
            newPassword,
            newUsername: username,
            newEmail: email
        };

        const response = await apiClient.post('/user/edit', body, {
            headers: getAuthHeader()
        });

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Unexpected response from server');
        }
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const uploadProfilePicture = async (file) => {
    try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await apiClient.post('/user/edit', formData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};
