import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import AuthView from "@/views/AuthView.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
