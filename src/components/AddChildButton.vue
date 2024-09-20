<script setup>
import { useInputStore } from '@/store/InputStore';
import PlusButton from './icons/PlusButton.vue';
const inputStore = useInputStore();

const addChild = () => {
  if (inputStore.children.length < 5) {
    inputStore.addChild();
  }
};
</script>

<template>
  <button
    class="absolute bottom-[-77px] right-0 ml-auto flex items-center rounded-full border-2 border-[#01A7FD] px-5 py-[10px] outline-[#1111117A] hover:bg-[#6E41E20A] focus:outline-2 active:bg-[#6E41E229]"
    @click="addChild"
    :disabled="inputStore.children.length >= 5"
    :class="{ invisible: inputStore.children.length >= 5 }"
  >
    <PlusButton />
    <span class="ml-2 text-sm font-normal leading-6 text-[#01A7FD]">Добавить ребенка</span>
  </button>
</template>
