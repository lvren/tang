<template>
  <card :header="{title: '验证加入分享'}">
    <div slot="content" style="text-align: center; padding: 24px 0;">
      <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
    </div>
  </card>
</template>

<script>
import { Qrcode, Card } from "vux";

export default {
  components: {
    Qrcode,
    Card
  },
  data() {
    return {
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
  }
};
</script>

<style lang="less">
</style>
