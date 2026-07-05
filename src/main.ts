import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJsSquare, faJava, faVuejs, faDocker, faReact, faGithub, faSpotify, faNodeJs, faAws, faGitAlt} from '@fortawesome/free-brands-svg-icons';
import { faUsers, faRocket, faCamera, faMicrochip, faMapPin, faGamepad, faLeaf, faArrowRight, faTerminal, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faCloud, faArrowUp, faTableList, faDatabase, faCode, faCodeBranch, faCube} from '@fortawesome/free-solid-svg-icons';
import { fa3 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPython, faJsSquare, faJava, faVuejs, faReact, faDocker, faGithub, faSpotify, faNodeJs, faAws, faGitAlt,
    faUsers, faRocket, faCamera, faMicrochip, faDatabase, faCode, faCodeBranch, faCube, faMapPin, faGamepad, faLeaf, faArrowRight, faTerminal, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faCloud, faArrowUp, faTableList);
library.add(fa3);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');
