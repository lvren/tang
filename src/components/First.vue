<template>
  <div>
    <view-box ref="viewBox">
      <card>
        <img slot="header" src="../assets/background.jpeg" style="width:100%;display:block;">
        <div slot="content">
          <panel header="本期校友 --- 郑茹丹" :list="list" type="2"></panel>
        </div>
      </card>
    </view-box>
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
import { ViewBox, Tabbar, Panel, Card, XButton } from "vux";

export default {
  components: {
    ViewBox,
    Panel,
    Tabbar,
    XButton,
    Card
  },
  data() {
    return {
      list: [
        {
          title: "校友简历",
          desc: "郑茹丹，来自云南昆明，2013年来到丹麦求学。茹丹目前就读于丹麦奥尔堡大学全球化文化交流专业，是一名二年级研究生。"
        },
        {
          title: "求学经历",
          desc: "茹丹的求学之路始于丹麦西南商学院市场管理专业（AP项目=国内的专科）。从丹麦西南商学院毕业后，又顺利申请到北丹麦大学学院的国际销售和管理专业（BA项目=国内的本科），以及现在的奥尔堡大学全球化文化交流专业。（MA项目=国内的研究生）。来丹麦留学的五年里，茹丹跨越了三个主流丹麦高校类型（商学院、大学学院和综合性大学），学到了一些和国内不一样的学习生活经历。她期待把自己的经历和对丹麦感兴趣的学生分享，为他们精彩的留学梦做好准备。"
        },
        {
          title: "分享内容",
          desc: "本次校友分享时长约1小时，分享主题为：1. 丹麦学校 \n\r 2. 学习环境 \n\r 3. 专业选择 \n\r 4. 学校申请 \n\r 5. 留学生活常识（住宿） \n\r"
        },
      ]
    };
  },
  methods: {
    jsApiCall() {
      this.$http.get('/api/getPayParam').then(({ data }) => {
        if (data && data.status) {
          const jsApiParameters = data.param;
          // this.$wechat.chooseWXPay({
          //   ...jsApiParameters,
          //   success: function (res) {
          //     console.log(res);
          //   }
          // });
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            jsApiParameters,
            (res) => {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                $this.$router.push('/pay');
              } else {
                alert(res.err_code + res.err_desc + res.err_msg);
              }
            }
          );
        }
      })
    },
  }
};
</script>

<style lang="less">
</style>
