<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
      <slot></slot>
    </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      mouseWheel: true
    });
    // });
    //监听滚动的位置
    this.scroll.on("scroll", position => {
      //   console.log(position);
      //实时回调probetype
      this.$emit("scroll", position);
    });
    //监听上拉事件,这里打印this.scroll对象时，发现其height属性时大时少
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    refresh() {
      // console.log("---");
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>
<style>
.wrapper {
  height: 200%;
}
</style>