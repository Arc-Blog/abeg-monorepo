import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

// setup写法
export const useAppStore = defineStore('app', () => {
  // state
  const device = useStorage('device', 'desktop'); // useStorage 返回一个响应式ref对象
  return {
    device,
  };
});
