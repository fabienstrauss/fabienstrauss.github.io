import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css';

// Importing FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJsSquare, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Adding icons to the library
library.add(faPython, faJsSquare, faHtml5, faTerminal);

// Create Vue application
const app = createApp(App);

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router and mount the app
app.use(router).mount('#app');