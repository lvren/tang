import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import { TransferDom, AjaxPlugin } from 'vux';
import App from './App';
import Layout from './Layout';
import First from './components/First';
import Second from './components/Second';
import Third from './components/Third';

import AdvanceLayout from './components/advance/Layout';
import AdvanceFirst from './components/advance/First';
import AdvanceSecond from './components/advance/Second';
import AdvanceThird from './components/advance/Third';

import product from './Product';
import shareImg from './assets/shareLogo.jpeg';
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
}, {
  path: '/advance',
  component: AdvanceLayout,
  children: [
    {
      path: '',
      component: AdvanceFirst,
    },
    {
      path: 'pay',
      component: AdvanceSecond,
    },
    {
      path: 'share',
      component: AdvanceThird,
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
      debug: false,
      jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'],
    });
  }
});
wx.ready(() => {
  wx.onMenuShareTimeline({
    title: '校友说-链接你与海外校友',
    imgUrl: `http://talktoalumni.com${shareImg}`,
  });
  wx.onMenuShareAppMessage({
    title: '校友说', // 分享标题
    desc: '听校友说，关于留学的一切！',
    imgUrl: `http://talktoalumni.com${shareImg}`,
  });
});

router.beforeEach((to, from, next) => {
  const isAdvance = /advance/.test(to.path);
  Vue.http.get('/api/isLogin', {
    params: { product: isAdvance ? 'advance' : product },
  }).then(({ data }) => {
    const { order } = data;
    let toPath = isAdvance ? '/advance' : '/';
    if (order && order.id) {
      if (order.isPay) {
        if (order.status) {
          toPath = isAdvance ? '/advance/share' : '/share';
        } else {
          toPath = isAdvance ? '/advance/pay' : '/pay';
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
