<script setup>
import HomePage from "./components/HomePage.vue";
import HamburgerIcon from "./components/icons/IconHamburger.vue";
</script>

<template>
  <header>
    <button>
      <HamburgerIcon />
    </button>
  </header>

  <main>
    <HomePage />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: end;
  padding: 10px;
  line-height: 1.5;
  button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #d6d6d6;
}
</style>
