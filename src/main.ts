import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJsSquare, faHtml5, faCss3Alt, faWordpress, faWindows, faJava, faVuejs, faDocker, faReact, faGithub, faSpotify} from '@fortawesome/free-brands-svg-icons';
import { faUsers, faRocket, faCamera, faMicrochip, faMapPin, faGamepad, faLeaf, faArrowRight, faTerminal, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faCloud, faArrowUp, faTableList, faDatabase} from '@fortawesome/free-solid-svg-icons';
import { fa3 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPython, faJsSquare, faHtml5, faCss3Alt, faWordpress, faWindows, faJava, faVuejs, faReact, faDocker, faGithub, faSpotify,
    faUsers, faRocket, faCamera, faMicrochip, faDatabase, faMapPin, faGamepad, faLeaf, faArrowRight, faTerminal, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faCloud, faArrowUp, faTableList);
library.add(fa3);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');