import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import routers from '@/routers'
import { useAuthStore } from './stores/auth.store.ts';

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(routers)
app.mount('#app')

const authStore = useAuthStore();
await authStore.hydrateUser();