<template>
  <div style="height: calc(100% - 50px)">
    <view-box ref="viewBox">
      <card>
        <img slot="header" src="../../assets/background.jpeg" style="width:100%;display:block;">
        <div slot="content">
          <div class="detail-content" style="padding-top: 12px">
            <div class="detail-title">我和丹麦留学不得不说的故事</div>
            <div class="detail-main">
              <p>博主N年前申请丹麦留学的时候，曾经很费心力想找到一个学长/学姐来问问题，于是跑到各大论坛发帖，结果没有找到一个学长/学姐却找到一堆同样命运同求前辈的小伙伴。</p>
              <p>于是博主毕业N年后有一天午夜梦回，又想起了当时申请的困境，突发奇想决定打造一个帮助申请学生咨询国外高校校友的平台，首先就要拿丹麦来开刀！虽然丹麦留学的人好少好少的，但能帮助一个是一个！</p>
              <p>博主想打造的这个平台我给它取了个名字叫做“校友说”，由校友来说关于丹麦高校的留学经历、申请经验、学习和生活体验，但不是免费说。校友毕竟也要花费自己的精力和时间来提供咨询，所以是付费咨询（1VS1）。</p>
            </div>
          </div>
          <div class="detail-content" style="padding-top: 12px">
            <div class="detail-title">1VS1在线咨询服务</div>
            <div class="detail-main">
              <p>内容包括：</p>
              <ul>
                <li>心仪大学的学长/学姐提供在线咨询，关于留学的所有问题都可以！</li>
                <li>专属于你的个性化指导，帮你最佳状态申请名校</li>
                <li>更多可选服务：包括文书修改、全程申请指导、签证和行前指导等等</li>
              </ul>
            </div>
          </div>
          <div class="detail-content">
            <div class="detail-main" style="font-weight: bolder;text-decoration: underline;">感兴趣的就问起来吧！</div>
            <div class="detail-main">咨询时长
              <inline-x-number width="30px" :min="1" v-model="time"></inline-x-number>小时
            </div>
          </div>
          <div class="detail-content">
            <popover placement="top" :show="showPopover">
              <div slot="content" class="popover-content">
                请阅读《校友说服务协议》并选择确认已读
              </div>
              <div class="detail-main" style="margin: 12px 6px 0 -6px;" ref="agreement">
                <check-icon :value.sync="agreement"> 
                  我已阅读并同意
                  <span @click="handleAgreement" style="color: blue">《校友说服务协议》</span>
                </check-icon>
              </div>
            </popover>
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
    <div v-transfer-dom>
      <x-dialog v-model="showAgreement" class="agreement-list">
        <p class="dialog-title">用户协议</p>
        <div class="img-box agreement-content" style="">
          <div class="content-title">一、总则</div>
          <div class="content-detail">1. 校友说的所有权和运营权归上海逐境网络科技有限公司所有。</div>
          <div class="content-detail">2. 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与校友说之间自动形成协议关系，用户应当受本协议的约束。</div>
          <div class="content-detail">3. 本协议可由校友说随时更新，用户应当及时关注并同意校友说不承担通知义务。</div>
            
          <div class="content-title">二、服务内容</div>
          <div class="content-detail">2.1 校友说首期服务内容包括：提供2018年申请季丹麦留学咨询服务（包括基本服务和增值服务），具体服务内容根据实际情况提供和收费。校友说可能会根据本服务的整体规划，对本服务相关权益细则、收费标准、方式等进行修改和变更，前述修改、变更，校友说将在相应服务页面进行展示。</div>

          <div class="content-title">三、服务期限</div>
          <div class="content-detail">3.1 基本服务提供时间为2018年10月1日至2019年2月1日，增值服务提供时间为2018年10月1日至2019年8月31日。校友说可能会根据本服务的整体规划和实际情况，对服务期限变更（缩短或者延长）。</div>

          <div class="content-title">四、关于收费</div>
          <div class="content-detail">4.1 本服务是校友说提供的收费服务，您须经注册系统完成注册程序并按照本服务收费标准支付相应费用后，方可使用本服务，具体服务内容根据实际情况提供和收费。</div>

          <div class="content-title">五、关于支付</div>
          <div class="content-detail">5.1 您应该使用微信支付方式依约支付。支付完成后，不可进行转让或退订。</div>
          <div class="content-detail">
            5.2 您不得通过以下任何方式为自己或他人开通本服务：
            <ul>
              <li>（1）以营利、经营等非个人使用的目的为自己或他人开通本服务</li>
              <li>（2）通过任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件等任何程序、软件方式为自己或他人开通本服务</li>
              <li>（3）通过任何不正当手段或以违反诚信原则的方式为自己或他人开通本服务</li>
              <li>（4）通过非校友说指定的方式为自己或他人开通本服务</li>
              <li>（5）通过侵犯校友说或他人合法权益的方式为自己或他人开通本服务</li>
              <li>（6）通过其他违反相关法律、行政法规、国家政策等的方式为自己或他人开通本服务</li>
            </ul>
          </div>

          <div class="content-title">六、使用规则</div>
          <div class="content-detail">6.1 不得利用本服务进行任何侵犯校友说以及任何第三方的知识产权、财产权、名誉权的行为。</div>
          <div class="content-detail">6.2 本服务是一项收费服务，以任何手段侵犯、破坏校友说收取费用的行为，校友说保佑追究行为人责任及索取赔偿的权利。</div>
          <div class="content-detail">6.3不得利用本服务进行任何违反法律法规、政策以及公序良素、社会公德等的行为</div>
          <div class="content-detail">
            6.4 用户对其在平台上传、发布或者传输的的内容负全部责任，所有用户不得发布含有下列内容之一的信息，否则校友说有权自行处理并不通知用户：
            <ul>
              <li>（1）违反宪法确定的基本原则的</li>
              <li>（2）危害国家安全、泄漏国家机密、颠覆国家政权、破坏国家统一的</li>
              <li>（3）损害国家荣誉和利益的</li>
              <li>（4）煽动民族仇恨、民族歧视、破坏民族团结的</li>
              <li>（5）破坏国家宗教政策、宣扬邪教和封建迷信的</li>
              <li>（6）散布谣言、扰乱社会秩序、破坏社会稳定的</li>
              <li>（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯最的</li>
              <li>（8）侮辱或者诽谤他人、侵害他人合法权益的</li>
              <li>（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的</li>
              <li>（10）以非法民间组织名义活动的</li>
              <li>（11）含有法律、行政法规禁止的其他内容</li>
            </ul>
          </div>

          <div class="content-title">七、隐私保护</div>
          <div class="content-detail">7.1 校友说不对外公开或向第三方提供单个用户的注册资料，但下列情况除外：
            <ul>
              <li>（1）事先获得用户的明确授权</li>
              <li>（2）根据有关的法律法规要求</li>
              <li>（3）按照相关政府主管部门的要求</li>
              <li>（4）为维护社会公众的利益</li>
            </ul>
          </div>

          <div class="content-title">八、版权声明</div>
          <div class="content-detail">8.1 校友说的所有内容（包括但不限于文字、图片、音频、视频）等版权均归上海逐境网络科技有限公司享有，未经许可，不得任意转载。</div>

          <div class="content-title">九、服务的中止、终止及变更</div>
          <div class="content-detail">9.1 本服务的中止或终止包含如下情况：
            <ul>
              <li>（1）用户主动中止或终止的</li>
              <li>（2）因为用户违约行为，校友说主动中止或终止服务的</li>
              <li>（3）因国家或相关部门要求或发生不可抗力事件时，校友说中止或终止服务的</li>
              <li>（4）其他根据法律法规应中止或终止服务的</li>
              <li>（5）中止或终止服务后，校友说有权利但无义务确保您收到特别提示或通知</li>
            </ul>
          </div>

          <div class="content-title">十、其他</div>
          <div class="content-detail">10.1 您使用本服务即视为您已阅读并同意受本协议的约束。</div>
        </div>
        <div @click="showAgreement=false">
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
      </x-dialog>
    </div>
    <tabbar slot="bottom">
      <div class="bottom-wrapper">
        <div class="bottom-content-left">金额：
          <span class="bottom-content-count">￥120 * {{time}}</span>
        </div>
        <div class="bottom-content-right">
          <x-button mini type="primary" @click.native="jsApiCall">立即购买</x-button>
        </div>
      </div>
    </tabbar>
  </div>

</template>

<script>
import { ViewBox, Tabbar, Panel, Card, XButton, Alert, Loading, CheckIcon, XDialog, InlineXNumber } from "vux";
import product from './Product';
import Popover from './Popover';

export default {
  components: {
    ViewBox,
    Panel,
    Tabbar,
    XButton,
    Alert,
    Loading,
    CheckIcon,
    XDialog,
    Popover,
    Card,
    InlineXNumber
  },
  data() {
    return {
      showMsg: false,
      msgTitle: '',
      msgMessage: '',
      showLoading: false,
      agreement: false,
      showAgreement: false,
      showPopover: false,
      time: 1,
    };
  },
  beforeDestroy() {
    this.timeout && clearTimeout(this.timeout);
  },
  watch: {
    agreement(value) {
      if (value) {
        this.showPopover = false;
      }
    }
  },
  mounted() {
    this.$http.get('/api/reportVisit', { params: { operate: 'viewFirst' } });
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
      if (!this.agreement) {
        const top = this.$refs.agreement.getBoundingClientRect().top
        this.$refs.viewBox.scrollTo(top);
        this.showPopover = true;
        // this.msgTitle = '购买失败';
        // this.msgMessage = '请阅读并同意《校友说服务协议》后购买';
        // this.showMsg = true;
        return false;
      }
      this.showLoading = true;
      this.$http.get('/api/getPayParam', { params: { product, number: this.time } }).then(({ data }) => {
        if (data && data.status) {
          const { param, order } = data;
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
          window.location.href = `/api/login?redirect=${url}`;
        }
        throw err;
      });
    },
    handleAgreement() {
      this.showAgreement = true;
    }
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
      padding: 3px;
    }
    ul {
      margin-left: 18px;
    }
    li {
      padding-bottom: 3px;
    }
    .weui-icon-success {
      font-size: 16px;
    }
    .weui-icon-success-circle {
      font-size: 16px;
    }
    .weui-icon-circle {
      font-size: 16px;
    }
  }
}
.bottom-wrapper {
  line-height: 50px;
  height: 50px;
  width: 100%;
  .bottom-content-count {
    color: red;
    font-weight: bolder;
  }
  .bottom-content-left {
    position: absolute;
    left: 12px;
  }
  .bottom-content-right {
    position: absolute;
    right: 6px;
  }
}
.agreement-content {
  height: 200px;
  padding: 15px 0;
  overflow: scroll;
  font-size: 12px;
  .content-detail {
    text-align: left;
    padding: 0 12px;
    ul {
      list-style: none;
    }
  }
}

.popover-content {
  font-size: 12px;
  margin: 6px;
}

.vux-inline-x-number {
  position: relative;
  top: 5px;
  left: 5px;
  padding-right: 5px;
  .vux-number-selector-sub {
    border-right: none;
    padding: 4px 8px 2px 8px;
    border-radius: 2px 0 0 2px;
  }
  .vux-number-selector {
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
  svg {
    width: 12px;
    height: 12px;
  }
  .vux-number-input {
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
