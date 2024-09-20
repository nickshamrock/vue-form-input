<script setup>
import { computed } from 'vue';
import { useInputStore } from '@/store/InputStore';
import AppUserInput from '@/components/AppUserInput.vue';
import AddChildButton from '@/components/AddChildButton.vue';

const inputStore = useInputStore();

const removeChild = (index) => {
  inputStore.removeChild(index);
};

const isInputInfoFull = computed(() => {
  const isPersonalComplete = inputStore.userName.trim() && inputStore.userAge;
  const areChildrenComplete = inputStore.children.every((child) => child.name.trim() && child.age);
  return isPersonalComplete && areChildrenComplete;
});

const saveData = () => {
  inputStore.saveData();
};

const showChildInputs = computed(() => inputStore.children.length > 0);
</script>

<template>
  <main class="h-full min-h-[616px] px-4 py-[30px]">
    <div class="relative mx-auto mb-11 flex w-full max-w-[616px] flex-col max-[360px]:mb-24">
      <h1 class="mb-5 text-base font-medium">Персональные данные</h1>

      <AppUserInput />

      <AddChildButton />
    </div>

    <div v-show="showChildInputs" class="mx-auto flex w-full max-w-[616px] flex-col">
      <h2 class="mb-5 text-base font-medium">Дети (макс. 5)</h2>
      <div
        v-for="(child, index) in inputStore.children"
        :key="index"
        class="mb-[10px] flex flex-wrap gap-[18px] last-of-type:mb-[30px]"
      >
        <!-- child input name -->
        <div class="flex flex-1 flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
          <label :for="'child-name-' + index" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Имя</label>
          <input
            :id="'child-name-' + index"
            :value="child.name"
            @input="inputStore.children[index].name = $event.target.value"
            type="text"
            class="text-sm font-normal leading-6 text-black outline-none"
            autocomplete="on"
          />
        </div>

        <!-- child input age -->
        <div class="mb-0 flex flex-1 flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
          <label :for="'child-age-' + index" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Возраст</label>
          <input
            :id="'child-age-' + index"
            :value="child.age"
            @input="inputStore.children[index].age = $event.target.value"
            type="number"
            class="text-sm font-normal leading-6 text-black outline-none"
            min="0"
            max="120"
          />
        </div>

        <button @click="removeChild(index)" class="text-sm text-[#01A7FD] hover:underline">Удалить</button>
      </div>

      <button
        @click="saveData"
        :disabled="!isInputInfoFull"
        :class="{ invisible: !isInputInfoFull }"
        class="mr-auto rounded-full bg-[#01A7FD] px-5 py-[10px] text-sm font-normal leading-6 text-white hover:bg-[#0F79AF] focus:outline-2 focus:outline-[#1111117A] active:bg-[#59C79F]"
      >
        Сохранить
      </button>
    </div>
  </main>
</template>
