<template>
  <div>
    <nav-bar>
      <div
        slot="left"
        class="back"
        @click="backclick"
      >
        <img
          src="@/assets/img/common/back.svg"
          alt=""
        >
  </div>
  <div
    slot="center"
    class="title"
  >
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="titleitem"
      :class="{active: index===currindex}"
      @click="titleClick(index)"
    >
      {{item}}
      </div>
      </div>
      </nav-bar>
      </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetialiNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currindex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currindex = index;
      this.$emit("titleClick", index);
    },
    backclick() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.title {
  display: flex;
}
.titleitem {
  flex: 1;
}
.active {
  color: pink;
}
.back {
  margin-top: 5px;
}
</style>