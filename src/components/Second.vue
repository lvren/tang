<template>
  <div>
    <group title="验证手机，让我们更好的为独一无二的您服务">
      <x-input v-model="mobile" title="手机号" class="weui-vcode">
        <x-button :disabled="disabledBtn" slot="right" :type="disabledBtn ? 'default' : 'primary'" mini @click.native="sendCode">
          {{ disabledBtn ? `${countDown}s后重试` : '发送验证码'}}
        </x-button>
      </x-input>
      <x-input title="验证码" required />
      <x-input title="微信号" required />
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
      list: [
        {
          title: "介绍1",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        },
        {
          title: "介绍2",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        },
        {
          title: "介绍2",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        },
        {
          title: "介绍2",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        },
        {
          title: "介绍2",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        },
        {
          title: "介绍2",
          desc: "由各种物质组成的巨型球状天体，叫做星球。有自己的运行轨道。"
        }
      ]
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
      this.countDown = 5;
      clearInterval(this.codeTimer);
      this.codeTimer = setInterval(() => {
        this.countDown -= 1;
      }, 1000)
    },
    validateCode() {
      this.nextStep();
    }
  }
};
</script>

<style lang="less">
</style>
