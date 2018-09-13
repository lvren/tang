<template>
  <card :header="{title: '验证加入分享'}">
    <div slot="content" style="text-align: center; padding: 24px 0;">
      <img :src="qrcode" alt="二维码" style="width: 70%;">
    </div>
  </card>
</template>

<script>
import { Card } from "vux";
import qrcode from '../assets/qrcode.jpeg';

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
