import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  /*
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash };
    return { left: 0, top: 0 };
  }
});

router.afterEach(() => {
  const scroller = document.getElementById('content');
  if (scroller) scroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});

/*
router.afterEach(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const scroller = document.getElementById('content');
      if (scroller) {
        scroller.scrollTop = 0;
        scroller.scrollLeft = 0;
      }
      window.scrollTo(0, 0);
    });
  });
});
 */

export default router;