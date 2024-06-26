import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Work from '../views/Work.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  /*
  {
    path: '/work',
    name: 'work',
    component: Work
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;