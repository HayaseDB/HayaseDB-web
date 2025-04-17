import { RouteRecordRaw } from "vue-router";

const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard/admin",
    name: "Admin",
    component: () => import("@/layouts/DashboardLayout.vue"),
    redirect: "/dashboard/admin/contributions",
    children: [
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
