<template>
  <div class="tabcontrol">
    <div
      v-for="(item,index) in title"
      :key="index"
      :class="{active:index ===currentIndex}"
      @click="itemclick(index)"
      class="tabcontrolitem"
    >
      <span>{{item}}</span>
  </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    title: Array,
    default() {
      return [];
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style>
.tabcontrol {
  display: flex;
  text-align: center;
  background-color: #fff;
  height: 25px;
}
.tabcontrolitem {
  flex: 1;
}
.tabcontrolitem span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>