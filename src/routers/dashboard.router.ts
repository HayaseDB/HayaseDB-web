import { RouteRecordRaw } from "vue-router";
import { AuthService } from "@/services/endpoints/auth.service.ts";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import HomeView from "@/views/dashboard/HomeView.vue";
import KeyView from "@/views/dashboard/KeyView.vue";
import ContributionsManagerView from "@/views/dashboard/contributions/ContributionsManagerView.vue";
import ContributionsDetailsView from "@/views/dashboard/contributions/ContributionsDetailsView.vue";
import ContributionsSubmitView from "@/views/dashboard/submit/ContributionsSubmitView.vue";
import ProfileView from "@/views/dashboard/ProfileView.vue";
import SettingsView from "@/views/dashboard/SettingsView.vue";

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: DashboardLayout,
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
        component: HomeView,
      },
      {
        path: "key",
        name: "Key",
        component: KeyView,
      },
      {
        path: "contributions",
        children: [
          {
            path: "",
            name: "Contributions",
            component: ContributionsManagerView,
          },
          {
            path: ":id",
            name: "ContributionDetails",
            component: ContributionsDetailsView,
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
            component: ContributionsSubmitView,
          },
          {
            path: ":id",
            name: "Submit Changes",
            component: ContributionsSubmitView,
            props: true,
          },
        ],
      },
      {
        path: "profile",
        name: "DashboardProfile",
        component: ProfileView,
      },
      {
        path: "settings",
        name: "DashboardSettings",
        component: SettingsView,
      },
    ],
  },
];

export default dashboardRoutes;
