import { RouteRecordRaw } from "vue-router";
import { AuthService } from "@/services";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import UsersListView from "@/views/dashboard/admin/users/UsersListView.vue";
import UsersDetailsView from "@/views/dashboard/admin/users/UsersDetailsView.vue";
import AdminAnimeListView from "@/views/dashboard/admin/animes/AdminAnimeListView.vue";
import AdminContributionsListView from "@/views/dashboard/admin/contributions/AdminContributionsListView.vue";

const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard/admin",
    name: "Admin",
    component: DashboardLayout,
    redirect: "/dashboard/admin/contributions",
    beforeEnter: async (to, from, next) => {
      const isAuth = await AuthService.isAuthenticated();
      if (isAuth) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
      {
        path: "users",
        children: [
          {
            path: "",
            name: "UsersList",
            component: UsersListView,
          },
          {
            path: ":id",
            name: "UsersDetail",
            component: UsersDetailsView,
            props: true,
          },
        ],
      },
      {
        path: "animes",
        children: [
          {
            path: "",
            name: "AnimeList",
            component: AdminAnimeListView,
          },
        ],
      },
      {
        path: "contributions",
        children: [
          {
            path: "",
            name: "AdminContributions",
            component: AdminContributionsListView,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
