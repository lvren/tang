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
