import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import './assets/styles/theme.css';

import {FontAwesomeIcon} from './utils/fontAwesome'

const app = createApp(App)

app.use(router)

app.component('fontAwesomeIcon', FontAwesomeIcon);

app.mount('#app')
