<script setup>
import { computed } from 'vue';
import { useInputStore } from '@/store/InputStore';
import { getAgeSuffix } from '@/utils/ageSuffix';

const inputStore = useInputStore();

const hasValidChildren = computed(() => {
  return inputStore.savedChildren.some((child) => child.name.trim() && child.age);
});

const hasValidUser = computed(() => {
  return inputStore.userName.trim() && inputStore.userAge;
});
</script>

<template>
  <section class="h-full min-h-[616px] px-[51px] py-[30px]">
    <div class="flex gap-[34px] text-base">
      <!-- place for avatar -->
      <div class="w-full max-w-[290px] max-md:hidden"></div>
      <!-- place for avatar -->

      <div class="flex w-full max-w-[197px] flex-col gap-[60px]">
        <div class="flex flex-col gap-5">
          <h2 class="font-medium">Персональные данные</h2>
          <p v-if="!hasValidUser">Вы не указали данные</p>
          <span v-else class="font-bold"
            >{{ inputStore.userName }}, {{ inputStore.userAge }} {{ getAgeSuffix(inputStore.userAge) }}</span
          >
        </div>

        <div>
          <h3 class="mb-5 font-medium">Дети</h3>
          <p v-if="!hasValidChildren">Вы не указали детей</p>
          <ul v-else class="flex flex-col gap-5">
            <li
              v-for="(child, index) in inputStore.savedChildren"
              :key="index"
              class="w-fit rounded-[5px] bg-[#F1F1F1] px-5 py-[10px] font-bold"
            >
              {{ child.name.trim() }}, {{ child.age }} {{ getAgeSuffix(child.age) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
