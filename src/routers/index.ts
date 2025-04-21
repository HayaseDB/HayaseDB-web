import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth.router";
import dashboardRoutes from "./dashboard.router";
import mainRoutes from "@/routers/main.router.ts";
import adminRoutes from "@/routers/admin.router.ts";

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...mainRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
export default router;
