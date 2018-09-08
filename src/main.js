import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import { TransferDom, AjaxPlugin } from 'vux';
import App from './App';
import Layout from './Layout';
import First from './components/First';
import Second from './components/Second';
import Third from './components/Third';
// import Home from './components/Layout';

Vue.directive('transfer-dom', TransferDom);
Vue.use(VueRouter);
Vue.use(AjaxPlugin);

const routes = [{
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: First,
    },
    {
      path: 'pay',
      component: Second,
    },
    {
      path: 'share',
      component: Third,
    },
  ],
}];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  Vue.http.get('/api/isLogin').then(() => {
    next();
  }).catch((err) => {
    const { response } = err;
    if (response.status === 401) {
      const url = window.location.href;
      window.location.href = `http://talktoalumni.com/api/login?redirect=${url}`;
    }
    throw err;
  });
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  render: h => h(App),
});
