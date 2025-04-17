import { RouteRecordRaw } from "vue-router";
import { AuthService } from "@/services/endpoints/auth.service.ts";

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    beforeEnter: async (to, from, next) => {
      const isAuth = await AuthService.isAuthenticated();
      if (isAuth) {
        next();
      } else {
        next("/login");
      }
    },
    redirect: "/dashboard/home",
    children: [
      {
        path: "home",
        name: "Dashboard",
        component: () => import("@/views/dashboard/HomeView.vue"),
      },
      {
        path: "key",
        name: "Key",
        component: () => import("@/views/dashboard/KeyView.vue"),
      },
      {
        path: "contributions",
        children: [
          {
            path: "",
            name: "Contributions",
            component: () =>
              import(
                "@/views/dashboard/contributions/ContributionsManagerView.vue"
              ),
          },
          {
            path: ":id",
            name: "ContributionDetails",
            component: () =>
              import(
                "@/views/dashboard/contributions/ContributionsDetailsView.vue"
              ),
            props: true,
          },
        ],
      },
      {
        path: "submit",
        children: [
          {
            path: "",
            name: "Submit",
            component: () =>
              import("@/views/dashboard/submit/ContributionsSubmitView.vue"),
          },
          {
            path: ":id",
            name: "Submit Changes",
            component: () =>
              import("@/views/dashboard/submit/ContributionsSubmitView.vue"),
            props: true,
          },
        ],
      },
      {
        path: "profile",
        name: "DashboardProfile",
        component: () => import("@/views/dashboard/ProfileView.vue"),
      },
      {
        path: "settings",
        name: "DashboardSettings",
        component: () => import("@/views/dashboard/SettingsView.vue"),
      },
    ],
  },
];

export default dashboardRoutes;
