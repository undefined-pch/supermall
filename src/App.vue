<template>
  <div id="app">
    <keep-alive exclude="Detiali">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>

  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
body {
  height: 0;
  padding: 0;
}
</style>
