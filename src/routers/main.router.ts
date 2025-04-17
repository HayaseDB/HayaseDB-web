import { RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/main/HomeView.vue"),
      },
      {
        path: "/docs",
        name: "Docs",
        component: () => import("@/views/main/DocsView.vue"),
      },
    ],
  },
];

export default mainRoutes;
