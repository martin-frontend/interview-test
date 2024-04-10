<script setup>
import HomePage from "./components/HomePage.vue";
import Menu from "./components/Menu.vue";
</script>

<template>
  <header>
    <Menu />
  </header>
  <main>
    <HomePage />
  </main>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: end;
  padding: 10px;
  line-height: 1.5;
}

main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #d6d6d6;
}
</style>
