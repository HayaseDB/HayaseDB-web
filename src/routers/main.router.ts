import { RouteRecordRaw } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import HomeView from "@/views/main/HomeView.vue";
import DocsView from "@/views/main/DocsView.vue";
import ExplorerView from "@/views/main/ExplorerView.vue";
import AnimeView from "@/views/main/AnimeView.vue";
import Imprint from "@/views/ImprintView.vue";
import PrivacyPolicy from "@/views/PrivacyPolicyView.vue";
import Terms from "@/views/TermsView.vue";
import AnimeListView from "@/views/main/AnimeListView.vue";

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
        children: [
          {
            path: "",
            name: "Explorer",
            component: ExplorerView,
            props: true,
          },
          {
            path: "/explorer/animes/:id",
            component: AnimeView,
            props: true,
          },
          {
            path: "/explorer/animes",
            component: AnimeListView,
            props: false,
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
