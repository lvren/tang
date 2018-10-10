<template>
  <div>
    <span ref="trigger">
      <slot>
      </slot>
    </span>
    <div
      class="vux-popover"
      ref="popover"
      v-transfer-dom
      :style="popoverStyle"
      v-show="show">
        <div :class="arrowClass"></div>
        <div @click="$emit('on-click-content')">
          <slot name="content">
            <div v-html="content"></div>
          </slot>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popover',
  mounted() {
    this.$nextTick(() => {
      this.init()
      window.addEventListener('resize', this.reset)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reset)
  },
  props: {
    content: String,
    placement: String,
    show: false,
    gutter: {
      type: Number,
      default: 5
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.$nextTick(() => {
          this.init(true)
        })
      }
    }
  },
  methods: {
    reset() {
      if (this.show) {
        this.init(true)
      }
    },
    init(isReset) {
      const trigger = this.$refs.trigger.children[0]
      const popover = this.$refs.popover
      switch (this.placement) {
        case 'top':
          console.log(trigger.getBoundingClientRect());
          console.log(trigger);
          console.log(popover);
          // this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.left = trigger.offsetLeft
          this.position.top = trigger.getBoundingClientRect().top - popover.offsetHeight - this.gutter
          break
        case 'left':
          this.position.left = trigger.offsetLeft - popover.offsetWidth - this.gutter
          this.position.top = trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'right':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.gutter
          this.position.top = trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'bottom':
          this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = trigger.getBoundingClientRect().top + trigger.offsetHeight + this.gutter
          break
        default:
          console.warn('Wrong placement prop')
      }

      this.popoverStyle = {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        display: isReset ? this.popoverStyle.display : 'none'
      }
    }
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0
      },
      popoverStyle: {}
    }
  },
  computed: {
    arrowClass() {
      return {
        'vux-popover-arrow': true,
        'vux-popover-arrow-up': this.placement === 'bottom',
        'vux-popover-arrow-right': this.placement === 'left',
        'vux-popover-arrow-left': this.placement === 'right',
        'vux-popover-arrow-down': this.placement === 'top'
      }
    }
  }
}
</script>

<style lang="less">
@popover-bg-color: #35495e;
@popover-font-color: #fff;
@popover-border-radius: 3px;
@popover-border-width: 5px;

.vux-popover {
  position: absolute;
  left: 0;
  top: 0;
  background-color: @popover-bg-color;
  color: @popover-font-color;
  border-radius: @popover-border-radius;
  z-index: 500;
}
.vux-popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
}
.vux-popover-arrow-up {
  border-left: @popover-border-width solid transparent;
  border-right: @popover-border-width solid transparent;
  border-bottom: @popover-border-width solid @popover-bg-color;
  left: 50%;
  transform: translateX(-50%);
  top: -@popover-border-width;
}
.vux-popover-arrow-down {
  border-left: @popover-border-width solid transparent;
  border-right: @popover-border-width solid transparent;
  border-top: @popover-border-width solid @popover-bg-color;
  left: 3px;
  transform: translateX(3px);
  bottom: -@popover-border-width;
}
.vux-popover-arrow-left {
  border-top: @popover-border-width solid transparent;
  border-bottom: @popover-border-width solid transparent;
  border-right: @popover-border-width solid @popover-bg-color;
  top: 50%;
  transform: translateY(-50%);
  left: -@popover-border-width;
}
.vux-popover-arrow-right {
  border-top: @popover-border-width solid transparent;
  border-bottom: @popover-border-width solid transparent;
  border-left: @popover-border-width solid @popover-bg-color;
  top: 50%;
  transform: translateY(-50%);
  right: -@popover-border-width;
}
</style>
