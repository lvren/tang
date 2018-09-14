import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import { TransferDom, AjaxPlugin } from 'vux';
import App from './App';
import Layout from './Layout';
import First from './components/First';
import Second from './components/Second';
import Third from './components/Third';
import product from './Product';
import shareImg from './assets/shareimg.jpeg';
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

Vue.http.get('/api/jsConfig', {
  params: { href: location.href },
}).then(({ data: { data, status } }) => {
  if (status) {
    wx.config({
      ...data,
      debug: true,
      jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'],
    });
  }
});

wx.ready(() => {
  wx.updateAppMessageShareData({
    title: '校友说-链接你与海外校友',
    desc: '郑茹丹丹麦留学分享',
    link: shareImg,
  });
  wx.updateTimelineShareData({
    title: '校友说-链接你与海外校友', // 分享标题
    link: shareImg,
  });
});

router.beforeEach((to, from, next) => {
  Vue.http.get('/api/isLogin', {
    params: { product },
  }).then(({ data }) => {
    const { order } = data;
    let toPath = '/';
    if (order && order.id) {
      if (order.isPay) {
        if (order.status) {
          toPath = '/share';
        } else {
          toPath = '/pay';
        }
      }
    }
    if (to.path === toPath) {
      next();
    } else {
      next({ path: toPath });
    }
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
