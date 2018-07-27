<template>
  <card>
    <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
    <div slot="content">
      <panel header="产品名称" :list="list" type="2"></panel>
    </div>
  </card>
</template>

<script>
import { Panel, Card } from "vux";

export default {
  components: {
    Panel,
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
