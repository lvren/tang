import Vue from 'vue';
import FastClick from 'fastclick';
// import VueRouter from 'vue-router';
import { TransferDom } from 'vux';
import App from './App';
// import Home from './components/Layout';


Vue.directive('transfer-dom', TransferDom);
// Vue.use(VueRouter);

// const routes = [{
//   path: '/',
//   component: Home,
// }];

// const router = new VueRouter({
//   routes,
// });

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  // router,
  render: h => h(App),
}).$mount('#app-box');
