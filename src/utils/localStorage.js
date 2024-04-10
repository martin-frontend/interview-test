// 将数据存储到 localStorage 中
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// 从 localStorage 中获取数据
function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// 清除 localStorage 中的数据
function clearData(key) {
  localStorage.removeItem(key);
}

export { saveData, getData, clearData };
