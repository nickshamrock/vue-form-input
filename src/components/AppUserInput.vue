<script setup>
import { useInputStore } from '@/store/InputStore';

const inputStore = useInputStore();
</script>

<template>
  <div class="mb-[10px] flex flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
    <label for="name" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Имя</label>
    <input
      v-model="inputStore.userName"
      id="name"
      type="text"
      class="text-sm font-normal leading-6 text-black outline-none"
      autocomplete="on"
    />
  </div>

  <div class="mb-0 flex flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
    <label for="age" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Возраст</label>
    <input
      v-model="inputStore.userAge"
      id="age"
      type="number"
      class="text-sm font-normal leading-6 text-black outline-none"
      min="0"
      max="120"
    />
  </div>
</template>
