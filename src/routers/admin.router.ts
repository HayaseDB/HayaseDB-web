import { RouteRecordRaw } from "vue-router";
import { AuthService } from "@/services";

const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard/admin",
    name: "Admin",
    component: () => import("@/layouts/DashboardLayout.vue"),
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
            component: () =>
              import("@/views/dashboard/admin/users/UsersListView.vue"),
          },
          {
            path: ":id",
            name: "UsersDetail",
            component: () =>
                import("@/views/dashboard/admin/users/UsersDetailsView.vue"),
            props: true,
          },
        ],
      },
      {
        path: "contributions",
        children: [
          {
            path: "",
            name: "AdminContributions",
            component: () =>
              import(
                "@/views/dashboard/admin/contributions/AdminContributionsListView.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
