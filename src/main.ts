import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css';

// Importing FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJsSquare, faHtml5, faCss3Alt, faWordpress, faWindows, faJava, faVuejs, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faLeaf, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Adding icons to the library
library.add(faPython, faJsSquare, faHtml5, faCss3Alt, faWordpress, faWindows, faJava, faVuejs, faDocker,
    faDatabase, faLeaf, faArrowRight,
    faTerminal, 
    faChevronDown, faChevronUp);

// Create Vue application
const app = createApp(App);

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router and mount the app
app.use(router).mount('#app');