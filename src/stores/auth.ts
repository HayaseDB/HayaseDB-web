import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import api from '@/api';

interface AuthState {
    token: string | null;
}
export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: Cookies.get('Token') || null,
    }),

    actions: {
        async login(email: string, password: string) {
                const response: any = await api.post('/auth/login', { email, password });
                const accessToken = response.accessToken;
                if (accessToken) {
                    this.token = accessToken;
                    Cookies.set('Token', accessToken);

                    return accessToken;
                } else {
                    throw new Error('No access token received from the server.');
                }
            },

            logout() {
            this.token = null;
            Cookies.remove('Token');
            },
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});
