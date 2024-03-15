import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Adjust the path according to your file structure

createApp(App).use(router).mount('#app')
