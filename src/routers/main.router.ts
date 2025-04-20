import { RouteRecordRaw } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import HomeView from "@/views/main/HomeView.vue";
import DocsView from "@/views/main/DocsView.vue";
import ExplorerView from "@/views/main/ExplorerView.vue";
import AnimeView from "@/views/main/AnimeView.vue";
import Imprint from "@/views/Imprint.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import Terms from "@/views/Terms.vue";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: "docs",
        name: "Docs",
        component: DocsView,
      },
      {
        path: "explorer",
        name: "Explorer",
        children: [
          {
            path: "",
            component: ExplorerView,
            props: true,
          },
          {
            path: "/explorer/anime/:id",
            component: AnimeView,
            props: true,
          },
        ],
      },
      {
        path: "imprint",
        name: "Imprint",
        component: Imprint,
      },
      {
        path: "privacy-policy",
        name: "PrivacyPolicy",
        component: PrivacyPolicy,
      },
      {
        path: "terms",
        name: "Terms",
        component: Terms,
      },
    ],
  },
];

export default mainRoutes;
