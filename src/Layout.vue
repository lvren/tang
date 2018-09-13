<template>
  <div id="app" style="height:100%;">
    <div style="width: 95%;margin: 12px auto;">
      <step :value="step" background-color='#fbf9fe'>
        <step-item title="确认订单"></step-item>
        <step-item title="绑定手机"></step-item>
        <step-item title="确认分享"></step-item>
      </step>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Step, StepItem } from "vux";

export default {
  components: {
    Step,
    StepItem,
  },
  name: "app",
  computed: {
    step() {
      const { fullPath } = this.$route;
      const steps = {
        '/': 0,
        '/pay': 1,
        '/share': 2,
      }
      return steps[fullPath] || 0;
    }
  },
};
</script>

<style lang="less">
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
