import axios from 'axios'
import Cookies from 'js-cookie'
import {AuthService} from '@/services/auth.service';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = Cookies.get('token')

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    } else {
        console.warn('No authentication token found')
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.error('Token expired or invalid. Please log in again.');
            AuthService.logout()
        }
        return Promise.reject(error);
    }
)

export default api
