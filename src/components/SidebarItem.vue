<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  item: Object,
  level: Number,
});

const selectedKey = inject("selectedKey");
const clickItem = inject("clickItem");

const paddingLeft = computed(() => {
  const defaultValue = 10;
  const gap = 10;
  return `${props.level * gap + defaultValue}px`;
});

const selected = computed(() => {
  return selectedKey[props.level] == props.item.key;
});

const handleSelect = (key) => {
  clickItem(key, props.level);
};
</script>

<template>
  <div
    class="sidebar-item"
    :class="{ 'background-gary': selected && level == 0 }"
  >
    <div
      class="text"
      :class="{ 'yellow-text': selected }"
      :style="{ 'padding-left': paddingLeft }"
      @click="handleSelect(item.key)"
    >
      {{ item.text }}
    </div>
    <template v-if="item.children && selected">
      <SidebarItem
        v-for="i of item.children"
        :key="i.key"
        :item="i"
        :level="level + 1"
      ></SidebarItem>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  cursor: pointer;
  width: 100%;
  &.background-gary {
    background-color: gray;
    overflow-x: auto;
  }
  .text {
    text-align: left;
    color: white;
    font-size: 16px;
    white-space: nowrap;
    padding: 10px;
    &.yellow-text {
      color: yellow;
    }
  }
}
</style>
