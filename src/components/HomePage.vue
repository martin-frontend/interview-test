<script setup></script>
<template>
  <div class="container">
    <div class="cell">
      <div class="background"></div>
      <div class="ball"></div>
    </div>
    <div class="cell">
      <div class="background"></div>
    </div>
    <div class="cell">
      <div class="background blink-animate"></div>
      <div class="ball"></div>
    </div>

    <div class="cell">
      <div class="background"></div>
    </div>
    <div class="cell">
      <div class="background blink-animate"></div>
    </div>
    <div class="cell">
      <div class="background"></div>
    </div>

    <div class="cell">
      <div class="background"></div>
      <div class="ball"></div>
    </div>
    <div class="cell">
      <div class="background"></div>
    </div>
    <div class="cell">
      <div class="background blink-animate"></div>
      <div class="ball"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  padding: 0 5px;
  overflow: hidden;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid 2px;
  position: relative;
  .background {
    height: 100%;
    width: 100%;
    background: radial-gradient(
      circle,
      rgba(113, 81, 95, 1) 81%,
      rgba(0, 0, 0, 1) 100%
    );
    &.blink-animate {
      animation: blink 2s infinite;
    }
  }
  .ball {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #a5f12b;
    animation: move 2s infinite;
    z-index: 1;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100px);
  }
}
</style>
