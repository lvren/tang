<template>
  <div>
    <group title="验证手机，让我们更好的为独一无二的您服务">
      <x-input v-model="mobile" title="手机号" class="weui-vcode">
        <x-button :disabled="disabledBtn" slot="right" :type="disabledBtn ? 'default' : 'primary'" mini @click.native="sendCode">
          {{ disabledBtn ? `${countDown}s后重试` : '发送验证码'}}
        </x-button>
      </x-input>
      <x-input v-model="code" title="验证码" required />
      <x-input v-model="weixin" title="微信号" required />
    </group>
    <div style="padding:15px;">
      <x-button @click.native="validateCode" type="primary">验证并加入分享</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from "vux";
import { clearInterval, setInterval } from 'timers';

export default {
  components: {
    XInput,
    Group,
    XButton,
    Cell
  },
  props: {
    nextStep: Function
  },
  data() {
    return {
      disabledBtn: false,
      codeTimer: null,
      mobile: null,
      countDown: 0,
      code: null,
      weixin: null,
    };
  },
  watch: {
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
        console.log(data)
      })
      this.codeTimer = setInterval(() => {
        this.countDown -= 1;
      }, 1000)
    },
    validateCode() {
      this.$http.get('/api/saveInfo', {
        params: {
          mobile: this.mobile,
          code: this.code,
          weixin: this.weixin,
        }
      }).then(({ data }) => {
        this.nextStep();
      })
    }
  }
};
</script>

<style lang="less">
</style>
