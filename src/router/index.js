import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Portfolio from '@/components/portfolio/Portfolio';
import Stocks from '@/components/Stocks/Stocks';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/portfolio', name: 'Portfolio', component: Portfolio },
    { path: '/stocks', name: 'Stocks', component: Stocks },
    { path: '*', redirect: '/' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.log('to.savedPosition: ', savedPosition);
      return savedPosition;
    }
    if (to.hash) {
      console.log('to.hash: ', to.hash);
      return { selector: to.hash };
    }
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  console.log('global beforEach');
  // next(next); // stay on this page
  next();
});

export default router;
