import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import AuthView from "@/views/AuthView.vue";
import AccountView from "@/views/AccountView.vue";
import DeveloperView from "@/views/account/DeveloperView.vue";
import ProfileView from "@/views/account/ProfileView.vue";
import ExploreView from "@/views/db/ExploreView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showNavBar: true,
            showFooter: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: AuthView,
        meta: {
            showNavBar: true,
            showFooter: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: AuthView,
        meta: {
            showNavBar: true,
            showFooter: false
        }

    },
    {
        path: '/account',
        name: 'Account',
        component: AccountView,
        meta: {
            showNavBar: true,
            showFooter: true,
        },
        children: [
            {
                path: 'developer',
                name: 'Developer',
                component: DeveloperView,
                meta: {
                    showNavBar: true,
                    showFooter: true,
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfileView,
                meta: {
                    showNavBar: true,
                    showFooter: true,
                }
            }
        ]
    },
    {
        path: '/explore',
        name: 'Explore',
        component: ExploreView,
        meta: {
            showNavBar: true,
            showFooter: true
        }

    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
