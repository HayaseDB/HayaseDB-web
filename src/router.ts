import { createRouter, createWebHistory } from "vue-router"
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("./components/Login.vue")
    },
    {
        path: "/profile",
        name: "Example",
        component: () => import("./components/Profile.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router