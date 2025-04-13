import { RouteRecordRaw } from 'vue-router'
import {AuthService} from '@/services/auth.service'

const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/layouts/DashboardLayout.vue'),
        redirect: 'dashboard/home',
        beforeEnter: async (to, from, next) => {
            const isAuth = await AuthService.isAuthenticated();
            if (isAuth) {
                next();
            } else {
                next('/login');
            }
        },
        children: [
            {
                path: 'home',
                name: 'DashboardHome',
                component: () => import('@/views/dashboard/HomeView.vue'),
            },
            {
                path: 'key',
                name: 'DashboardKey',
                component: () => import('@/views/dashboard/KeyView.vue'),
            },
            {
                path: 'contributions',
                name: 'DashboardContributions',
                component: () => import('@/views/dashboard/ContributionsView.vue'),
            },
            {
                path: 'profile',
                name: 'DashboardProfile',
                component: () => import('@/views/dashboard/ProfileView.vue'),
            },
            {
                path: 'settings',
                name: 'DashboardSettings',
                component: () => import('@/views/dashboard/SettingsView.vue'),
            },
        ]
    }
]

export default dashboardRoutes
