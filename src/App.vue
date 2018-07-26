<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox">
      <router-view></router-view>
      <tabbar slot="bottom">adsfasdf</tabbar>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Tabbar } from "vux";

export default {
  components: {
    ViewBox,
    Tabbar
  },
  name: "app"
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>
