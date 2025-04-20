import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import routers from "@/routers";
import { useAuthStore } from "./stores/auth.store.ts";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "swiper/css";

import "swiper/css/pagination";

import { register } from "swiper/element/bundle";
register();

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(routers);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "bottom-right",
} as ToastContainerOptions);

routers.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.hydrateUser();
  next();
});
app.mount("#app");
