import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import './assets/styles/theme.css';
import './assets/styles/animations.css';
import DisableAutocomplete from 'vue-disable-autocomplete';

import {FontAwesomeIcon} from './utils/fontAwesome'

const app = createApp(App)
console.log(process.env.VUE_APP_API_URL)
app.use(router)

app.use(DisableAutocomplete)

app.component('fontAwesomeIcon', FontAwesomeIcon);

app.mount('#app')
