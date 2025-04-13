import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth.router'
import dashboardRoutes from './dashboard.router'
import mainRoutes from "@/routers/main.router.ts";

const routes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...mainRoutes,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
