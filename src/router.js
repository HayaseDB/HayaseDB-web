import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import Login from "@/views/LoginView.vue";

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
        component: Login,
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
