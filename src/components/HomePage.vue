<script setup>
import { reactive, onMounted } from "vue";
const jiugongge = reactive([
  { key: 1, ball: true, blink: false, button: true },
  { key: 2, ball: false, blink: false },
  { key: 3, ball: true, blink: true },
  { key: 4, ball: false, blink: false },
  { key: 5, ball: false, blink: true },
  { key: 6, ball: false, blink: false },
  { key: 7, ball: true, blink: false },
  { key: 8, ball: false, blink: false },
  { key: 9, ball: true, blink: true },
]);

const handelMove = () => {
  // 取得所有的球的外部 div 和球的 DOM 元素
  const cells = document.querySelectorAll(".cell");
  const ballCells = [];
  jiugongge.forEach((item, index) => {
    if (item.ball) ballCells.push(cells[index]);
  });
  const balls = document.querySelectorAll(".ball");

  // 定義目標座標
  const targetX = 150;
  const targetY = 300;

  // 將每個球移動到目標座標
  balls.forEach((ball, index) => {
    ball.style.animation = "none";

    const cell = ballCells[index];
    const rect = cell.getBoundingClientRect();
    const currentX = rect.left + window.scrollX;
    const currentY = rect.top + window.scrollY;

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    // 使用 CSS 的 transform 屬性來移動球
    ball.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  });
};
</script>

<template>
  <div class="container">
    <div class="cell" v-for="item of jiugongge" :key="item.key">
      <div class="background" :class="{ 'blink-animate': item.blink }"></div>
      <div v-if="item.ball" class="ball"></div>
      <button v-if="item.button" class="button" @click="handelMove">
        讓球集合
      </button>
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
    transition: all 1s;
  }

  .button {
    position: absolute;
    top: 0;
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
