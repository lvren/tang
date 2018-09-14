<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <card>
        <img slot="header" src="../assets/background.jpeg" style="width:100%;display:block;">
        <div slot="content">
          <div class="desc-title">
            <img slot="header" src="../assets/person.jpeg" class="title-img" />
            <div class="title-desc">
              <span class="title-main">郑茹丹</span>
              <span>本期校友</span>
            </div>
            <div class="title-sec">丹麦留学</div>
          </div>
          <div class="detail-content">
            <div class="detail-title">校友简介</div>
            <div class="detail-main">
              <p>郑茹丹，来自云南昆明，2013年来到丹麦求学。茹丹目前就读于丹麦奥尔堡大学全球化文化交流专业，是一名二年级研究生。</p>
              <p>茹丹的求学之路始于丹麦西南商学院市场管理专业（AP项目=国内的专科）。从丹麦西南商学院毕业后，又顺利申请到北丹麦大学学院的国际销售和管理专业（BA项目=国内的本科），以及现在的奥尔堡大学全球化文化交流专业。（MA项目=国内的研究生）。来丹麦留学的五年里，茹丹跨越了三个主流丹麦高校类型（商学院、大学学院和综合性大学），学到了一些和国内不一样的学习生活经历。她期待把自己的经历和对丹麦感兴趣的学生分享，为他们精彩的留学梦做好准备。</p>
            </div>
          </div>
          <div class="detail-content">
            <div class="detail-title">分享主题（约一个小时）</div>
            <div class="detail-main">
              <ul>
                <li>丹麦学校</li>
                <li>学习环境</li>
                <li>专业选择</li>
                <li>学校申请</li>
                <li>留学生活常识（住宿）</li>
              </ul>
            </div>
          </div>
        </div>
      </card>
    </view-box>
    <div v-transfer-dom>
      <Alert v-model="showMsg" :title="msgTitle">{{ msgMessage }}</Alert>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading"></loading>
    </div>
    <tabbar slot="bottom">
      <div class="bottom-wrapper">
        <div class="bottom-content-left">金额：
          <span class="bottom-content-count">￥99</span>
        </div>
        <div class="bottom-content-right">
          <x-button mini type="primary" @click.native="jsApiCall">立即购买</x-button>
        </div>
      </div>
    </tabbar>
  </div>

</template>

<script>
import { ViewBox, Tabbar, Panel, Card, XButton, Alert, Loading } from "vux";
import product from '../Product';

export default {
  components: {
    ViewBox,
    Panel,
    Tabbar,
    XButton,
    Alert,
    Loading,
    Card
  },
  data() {
    return {
      list: [
        {
          title: "校友简历",
          desc: ""
        },
        {
          title: "求学经历",
        },
        {
          title: "分享内容",
          desc: "本次校友分享时长约1小时，分享主题为："
        },
      ],
      showMsg: false,
      msgTitle: '',
      msgMessage: '',
      showLoading: false,
    };
  },
  beforeDestroy() {
    this.timeout && clearTimeout(this.timeout);
  },
  methods: {
    checkOrder(orderId) {
      this.$http.get('/api/checkOrder', { params: { order: orderId } }).then(({ data }) => {
        if (data && data.status) {
          this.showLoading = false;
          this.$router.push({ path: `/pay` });
        } else {
          this.timeout && clearTimeout(this.timeout);
          this.timeout = setTimeout(this.checkOrder.bind(this, orderId), 2000);
        }
      })
    },
    jsApiCall() {
      this.showLoading = true;
      this.$http.get('/api/getPayParam', { params: { product } }).then(({ data }) => {
        if (data && data.status) {
          const { param, order } = data;
          // console.log(param);
          // this.checkOrder(order.orderId);
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            param,
            (res) => {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                this.$http
                  .get('/api/payOrder', { params: { order: order.orderId } })
                  .then(({ data }) => {
                    this.showLoading = false;
                    if (data && data.status) {
                      this.$router.push({ path: `/pay` });
                    } else {
                      this.msgTitle = '下单失败';
                      this.msgMessage = data && data.message ? data.message : '下单失败';
                      this.showMsg = true;
                    }
                  })
                // this.checkOrder(order.orderId);
              } else {
                this.$http
                  .get('/api/closeOrder', { params: { order: order.orderId } })
                  .then(() => {
                    this.showLoading = false;
                    this.msgTitle = '下单失败';
                    this.msgMessage = res.err_desc;
                    this.showMsg = true;
                  })
              }
            }
          );
        } else {
          this.showLoading = false;
          this.msgTitle = '下单失败';
          this.msgMessage = data && data.message ? data.message : '下单失败';
          this.showMsg = true;
        }
      }).catch((err) => {
        const { response } = err;
        if (response.status === 401) {
          const url = window.location.href;
          window.location.href = `http://talktoalumni.com/api/login?redirect=${url}`;
        }
        throw err;
      });
    },
  }
};
</script>

<style lang="less">
.desc-title {
  padding: 14px 15px 0;
  color: #999999;
  font-size: 13px;
  position: relative;
  height: 80px;
  .title-desc {
    padding: 6px 0;
  }
  .title-img {
    height: 75px;
    float: right;
  }
  .title-main {
    font-size: 18px;
    color: #000;
    font-weight: bolder;
  }
  .title-sec {
    font-size: 14px;
  }
}
.detail-content {
  padding: 0 15px 5px;
  .detail-title {
    color: #999999;
    font-size: 16px;
    padding-bottom: 6px;
  }
  .detail-main {
    font-size: 13px;
    p {
      text-indent: 1rem;
      padding: 3px;
    }
    ul {
      padding-bottom: 12px;
      margin-left: 18px;
    }
    li {
      padding-bottom: 3px;
    }
  }
}
</style>
