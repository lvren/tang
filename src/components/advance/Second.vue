<template>
  <div style="height:100%;">
    <group title="验证手机，让我们更好的为独一无二的您服务">
      <x-input v-model="mobile" title="手机号" class="weui-vcode">
        <x-button :disabled="disabledBtn" slot="right" :type="disabledBtn ? 'default' : 'primary'" mini @click.native="sendCode">
          {{ disabledBtn && countDown !== 0 ? `${countDown}s后重试` : '发送验证码'}}
        </x-button>
      </x-input>
      <x-input v-model="code" title="验证码" required />
      <x-input v-model="weixin" title="微信号" required />
    </group>
    <div v-transfer-dom>
      <Alert v-model="showMsg" :title="msgTitle">{{ msgMessage }}</Alert>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="validateCode" type="primary">验证并加入分享</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Alert } from "vux";
import { clearInterval, setInterval } from 'timers';
import product from './Product';

export default {
  components: {
    XInput,
    Group,
    XButton,
    Alert,
    Cell
  },
  data() {
    return {
      disabledBtn: true,
      codeTimer: null,
      mobile: null,
      countDown: 0,
      code: null,
      weixin: null,
      msgTitle: null,
      msgMessage: null,
      showMsg: false
    };
  },
  mounted() {
    this.$http.get('/api/reportVisit', { params: { operate: 'viewSecond' } });
  },
  watch: {
    mobile(value) {
      if (!value || /\d{11}/.test(value)) {
        this.disabledBtn = false;
      } else {
        this.disabledBtn = true;
      }
    },
    countDown(value) {
      if (value === 0) {
        clearInterval(this.codeTimer);
        this.disabledBtn = false;
      }
    }
  },
  methods: {
    sendCode() {
      this.disabledBtn = true;
      this.countDown = 60;
      clearInterval(this.codeTimer);
      this.$http.get('/api/sendCode', {
        params: {
          mobile: this.mobile
        }
      }).then(({ data }) => {
        this.msgTitle = data && data.status ? '验证码发送成功' : '验证码发送失败';
        this.msgMessage = data && data.message ? data.message : "";
        this.showMsg = true;
      })
      this.codeTimer = setInterval(() => {
        this.countDown -= 1;
      }, 1000)
    },
    validateCode() {
      if (!this.weixin) {
        this.msgTitle = '验证失败';
        this.msgMessage = '微信号为必填项目';
        this.showMsg = true;
        return false;
      }
      this.$http.post('/api/saveInfo', {
        mobile: this.mobile,
        code: this.code,
        weixin: this.weixin,
        product,
      }).then(({ data }) => {
        const { status } = data;
        if (status) {
          this.$router.push({ path: `/advance/share` });
        } else {
          this.msgTitle = '验证失败';
          this.msgMessage = data && data.message ? data.message : "验证信息失败";
          this.showMsg = true;
        }
      })
    }
  }
};
</script>

<style lang="less">
</style>
