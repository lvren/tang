<template>
  <div id="app" style="height:100%;">
    <div style="width: 95%;margin: 0 auto;padding: 12px 0">
      <step :value="step" background-color='#fbf9fe'>
        <step-item title="确认订单"></step-item>
        <step-item title="绑定手机"></step-item>
        <step-item title="完成申请"></step-item>
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
        '/advance': 0,
        '/advance/pay': 1,
        '/advance/share': 2,
      }
      return steps[fullPath] || 0;
    }
  },
};
</script>
