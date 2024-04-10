<script setup>
import { ref } from "vue";
import HamburgerIcon from "../components/icons/IconHamburger.vue";
import Sidebar from "../components/Sidebar.vue";

const isShowSidebar = ref(false);
const showSidebar = () => {
  isShowSidebar.value = true;
};
</script>
<template>
  <button @click.stop="showSidebar">
    <HamburgerIcon />
    <Sidebar v-model="isShowSidebar" />
  </button>
</template>
<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
