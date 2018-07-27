<template>
  <div>
    <group title="验证手机，让我们更好的为独一无二的您服务">
      <x-input title="验证码">
        <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
      </x-input>
      <x-input title="发送验证码" class="weui-vcode">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
    </group>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from "vux";

export default {
  components: {
    XInput,
    Group,
    XButton,
    Cell
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
