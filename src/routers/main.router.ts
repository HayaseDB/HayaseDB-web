import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '/',
                name: 'MainHome',
                component: () => import('@/views/main/HomeView.vue'),
            }
        ]
    }
]

export default mainRoutes
