import {defineStore} from 'pinia';
import type {User} from '@/services/auth.service';
import {AuthService} from '@/services/auth.service';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        getUser: (state) => state.user,
    },


    actions: {
        async hydrateUser() {
            try {
                this.user = await AuthService.getMe();
            } catch (err) {
                console.error('Failed to hydrate user:', err);
                this.clearUser();
            }
        },

        clearUser() {
            this.user = null;
        },
    },
});
