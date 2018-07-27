<template>
  <div id="app" style="height:100%;">
    <x-header
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >
      导航
    </x-header>
    <div style="width: 95%;margin: 12px auto;">
      <step v-model="step" background-color='#fbf9fe'>
        <step-item title="确认订单"></step-item>
        <step-item title="绑定手机"></step-item>
        <step-item title="确认分享"></step-item>
      </step>
    </div>
    <view-box ref="viewBox">
      <First v-if="step === 0" />
      <Second v-if="step === 1" />
      <Third v-if="step === 2" />
    </view-box>
    <tabbar slot="bottom">
      <div class="bottom-wrapper">
      <div class="bottom-content-left">金额：<span class="bottom-content-count">￥99</span></div>
      <div class="bottom-content-right">
        <x-button mini type="primary" @click.native="nextStep">立即购买</x-button>
      </div>
      </div>
    </tabbar>
    <div v-transfer-dom>
      <Actionsheet :menus="menus" v-model="showMenus" show-cancel></Actionsheet>
    </div>
  </div>
</template>

<script>
import {
  Step,
  StepItem,
  ViewBox,
  XHeader,
  Tabbar,
  XButton,
  Actionsheet
} from "vux";
import First from "./components/First";
import Second from "./components/Second";
import Third from "./components/Third";

export default {
  components: {
    First,
    Second,
    Third,
    Step,
    StepItem,
    ViewBox,
    XHeader,
    XButton,
    Actionsheet,
    Tabbar
  },
  name: "app",
  data() {
    return {
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      step: 0,
      showMenus: false
    };
  },
  methods: {
    nextStep() {
      this.step++;
    },
    onIndexChange(index) {
      this.imgIndex = index;
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.bottom-wrapper {
  line-height: 41px;
  height: 41px;
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
</style>
