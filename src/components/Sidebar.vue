<script setup>
import { ref, reactive, provide, onMounted, computed } from "vue";
import SidebarItem from "../components/SidebarItem.vue";
import { saveData, getData } from "../utils/localStorage.js";

const localStorageKey = "selectedKey";
const props = defineProps({
  modelValue: Boolean,
});
const emits = defineEmits();

const onClickAway = (event) => {
  emits("update:modelValue", false);
};

// 保存json假資料
const data = ref([]);

// 獲取假資料
const fetchData = async () => {
  try {
    const response = await fetch("./mock/data.json");
    const jsonData = await response.json();

    data.value = jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 保存sidebar選中的key
const selectedKey = reactive([]);
provide("selectedKey", selectedKey);

// 下拉選單資料
const fastSelectData = computed(() => {
  const arr = [];

  function fn(child, parentKey) {
    child.forEach((item) => {
      arr.push({ key: item.key, text: item.text, parentKey: [...parentKey] });
      if (item.children) fn(item.children, [...parentKey, item.key]);
    });
  }

  data.value.forEach((item) => {
    arr.push({ key: item.key, text: item.text, parentKey: [] });
    if (item.children) fn(item.children, [item.key]);
  });
  return arr;
});

// 下拉選單的v-model
const fastSelected = ref("");

// 下拉選單事件
const handleSelect = () => {
  const findData = fastSelectData.value.find(
    (item) => item.key == fastSelected.value
  );
  selectedKey.splice(0);
  selectedKey.push(...findData.parentKey, findData.key);
  saveData("selectedKey", selectedKey);
};

// sidebar點擊事件處理
const handleClickItem = (key, level) => {
  if (selectedKey[level] == key) {
    selectedKey.splice(level);
  } else {
    selectedKey[level] = key;
    selectedKey.splice(level + 1);
  }
  fastSelected.value = key;
  saveData("selectedKey", selectedKey);
};
provide("clickItem", handleClickItem);

onMounted(() => {
  fetchData();
  const localStorageData = getData(localStorageKey) ?? [];
  selectedKey.push(...localStorageData);
  fastSelected.value = localStorageData.pop();
});
</script>

<template>
  <Transition name="expend">
    <div v-show="modelValue" class="container" v-click-away="onClickAway">
      <div class="fast-select">
        <label for="fast-select" style="color: white">Fast select:</label>
        <select v-model="fastSelected" @change="handleSelect" id="fast-select">
          <option v-for="i of fastSelectData" :key="i.key" :value="i.key">
            {{ i.text }}
          </option>
        </select>
      </div>

      <SidebarItem v-for="i of data" :key="i.key" :item="i" :level="0" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
$sidebar-width: 200px;
.container {
  width: $sidebar-width;
  height: 100%;
  padding: 10px;
  position: absolute;
  z-index: 2;
  background-color: black;
  opacity: 0.9;
  right: 0;
  top: 0;
  cursor: auto;
  overflow: auto;

  .fast-select {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 10px;
  }
}

.expend-enter-active,
.expend-leave-active {
  transition: all 0.3s ease-in-out;
  transform: translateX(0);
}

.expend-enter-from,
.expend-leave-to {
  transform: translateX($sidebar-width);
}
</style>
