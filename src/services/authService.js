
import axios from 'axios';
import Cookies from 'js-cookie';


export const register = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/user/register`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/user/login`, { email, password });
        const { token } = response.data;

        Cookies.set('token', token, { expires: 7 });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const getToken = () => {
    return Cookies.get('token');
};

export const checkToken = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/user/check`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Token validation failed');
    }
};
