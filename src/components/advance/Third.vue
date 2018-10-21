<template>
  <card :header="{title: '购买成功'}">
    <div slot="content" style="text-align: center; padding: 24px 0;">
      <p>服务购买成功</p>
      <p>具体服务将在1个工作日内完成展开，敬请关注微信通知</p>
    </div>
  </card>
</template>

<script>
import { Card } from "vux";

export default {
  components: {
    Card
  },
  data() {
    return {
      qrcode
    };
  }
};
</script>

<style lang="less">
</style>
