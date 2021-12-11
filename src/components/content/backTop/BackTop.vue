<template>
    <div class="backtop">
        <img
            src="@/assets/img/common/top.png"
            alt=""
        >
    </div>
</template>

<script>
export default {
  name: "BackTop"
};
</script>
<style>
.backtop {
  position: fixed;
  z-index: 22;
  right: -30px;
  bottom: 40px;
}
.backtop img {
  width: 60%;
}
</style>