import { createApp } from 'vue'
import App from './App.vue'
import { setTheme } from "@/utils/theme";
import router from "@/router";
import './assets/styles/theme.css';


setTheme('dark')

const app = createApp(App)

app.use(router)

app.mount('#app')
