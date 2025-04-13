import api from '@/services/api.ts';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/auth.store.ts';

export interface User {
    userId: string;
    username: string;
    email?: string;
    role?: string;
}

export const AuthService = {
    async login(email: string, password: string): Promise<void> {
        const payload = { email, password };
        const authStore = useAuthStore();

        try {
            const res = await api.post('/auth/login', payload);

            if (res.data.token) {
                Cookies.set('token', res.data.token);
            }
            await authStore.hydrateUser();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Login failed. Please check your credentials.');
        }
    },
    async register(email: string, password: string): Promise<void> {
        const payload = { email, password };
        try {
            await api.post('/auth/register', payload);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Registration failed. Please check your credentials.');
        }
    },
    async getMe(): Promise<User> {
        try {
            const res = await api.get('/auth/me');
            return res.data.user;
        } catch (error: any) {
            throw new Error('Failed to fetch user data. Please log in again.');
        }
    },
    async isAuthenticated(): Promise<boolean> {
        const authStore = useAuthStore();
        if (!authStore.user) {
            await authStore.hydrateUser();
        }
        return authStore.user !== null;
    },

    logout(): void {
        const authStore = useAuthStore();
        authStore.clearUser();
        Cookies.remove('token');
    },
};
