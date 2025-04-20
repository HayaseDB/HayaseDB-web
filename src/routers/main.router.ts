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
        path: "docs",
        name: "Docs",
        component: () => import("@/views/main/DocsView.vue"),
      },
      {
        path: "explorer",
        name: "Explorer",
        children: [
          {
            path: "",
            component: () => import("@/views/main/ExplorerView.vue"),
            props: true,
          },
          {
            path: "/explorer/anime/:id",
            component: () => import("@/views/main/AnimeView.vue"),
            props: true,
          },
        ],
      },
      {
        path: 'imprint',
        name: 'Imprint',
        component: () => import("@/views/Imprint.vue"),
      },
      {
        path: 'privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import("@/views/PrivacyPolicy.vue"),
      },
      {
        path: 'terms',
        name: 'Terms',
        component: () => import("@/views/Terms.vue"),
      }
    ],
  },
];

export default mainRoutes;
