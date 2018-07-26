<template>
  <div>
    <x-header
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >
      导航
    </x-header>
    <div style="width: 95%;margin: 12px auto;">
      <step v-model="step1" background-color='#fbf9fe'>
        <step-item title="确认订单"></step-item>
        <step-item title="绑定手机"></step-item>
        <step-item title="确认分享"></step-item>
      </step>
    </div>
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-content">
        <p style="color:#999;">Posted on January 21, 2015</p>
        <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..</p>
      </div>
    </card>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextStep">{{ 'next step' }}</x-button>
    </div>
    <div v-transfer-dom>
      <Actionsheet :menus="menus" v-model="showMenus" show-cancel></Actionsheet>
    </div>
  </div>
</template>

<script>
import {
  Step,
  StepItem,
  XButton,
  XHr,
  XHeader,
  Swiper,
  Actionsheet,
  Card
} from "vux";

const baseList = [
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
    title: "送你一朵fua"
  },
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
    title: "送你一辆车"
  },
  {
    url: "javascript:",
    img: "https://static.vux.li/demo/5.jpg", // 404
    title: "送你一次旅行",
    fallbackImg:
      "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
  }
];

export default {
  components: {
    Step,
    StepItem,
    XButton,
    XHr,
    XHeader,
    Swiper,
    Actionsheet,
    Card
  },
  data() {
    return {
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      step1: 1,
      showMenus: false,
      imgList: baseList,
      imgIndex: 0
    };
  },
  methods: {
    nextStep() {
      this.step2++;
    },
    onIndexChange(index) {
      this.imgIndex = index;
    }
  }
};
</script>

<style lang="less">
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
.card-content {
  padding: 1rem;
}
</style>
