<script setup>
import { ref, computed } from 'vue';
import { useInputStore } from '@/store/InputStore'; // Используем хранилище Pinia
import PlusButton from '@/components/icons/PlusButton.vue';

const inputStore = useInputStore();

const showChildInputs = ref(false);

const toggleChildInputs = () => {
  if (!showChildInputs.value) {
    showChildInputs.value = true;
    addChild();
  } else if (inputStore.children.length < 5) {
    addChild();
  }
};

const addChild = () => {
  if (inputStore.children.length < 5) {
    inputStore.children.push({ name: '', age: '' });
  }
};

const removeChild = (index) => {
  inputStore.children.splice(index, 1);
  if (inputStore.children.length === 0) {
    showChildInputs.value = false;
  }
};

// Проверка заполненности полей
const isInputInfoFull = computed(() => {
  const isPersonalComplete = inputStore.userName.trim() && inputStore.userAge;
  const areChildrenComplete = inputStore.children.every((child) => child.name.trim() && child.age);
  return isPersonalComplete && areChildrenComplete;
});
</script>

<template>
  <main class="h-full min-h-[616px] px-4 py-[30px]">
    <div class="relative mx-auto mb-11 flex w-full max-w-[616px] flex-col max-[360px]:mb-24">
      <h1 class="mb-5 text-base font-medium">Персональные данные</h1>

      <!-- Первый инпут c именем -->
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

      <!-- Второй инпут с возрастом -->
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

      <!-- Кнопка для открытия меню и добавления ребенка -->
      <button
        class="absolute bottom-[-77px] right-0 ml-auto flex items-center rounded-full border-2 border-[#01A7FD] px-5 py-[10px] outline-[#1111117A] hover:bg-[#6E41E20A] focus:outline-2 active:bg-[#6E41E229]"
        @click="toggleChildInputs"
        :disabled="inputStore.children.length >= 5"
        :class="{ invisible: inputStore.children.length >= 5 }"
      >
        <PlusButton />
        <span class="ml-2 text-sm font-normal leading-6 text-[#01A7FD]">Добавить ребенка</span>
      </button>
    </div>

    <!-- Форма для ввода данных о детях -->
    <div v-show="showChildInputs" class="mx-auto flex w-full max-w-[616px] flex-col">
      <h2 class="mb-5 text-base font-medium">Дети (макс. 5)</h2>
      <div
        v-for="(child, index) in inputStore.children"
        :key="index"
        class="mb-[10px] flex flex-wrap gap-[18px] last-of-type:mb-[30px]"
      >
        <!-- Инпут для имени ребенка -->
        <div class="flex flex-1 flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
          <label :for="'child-name-' + index" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Имя</label>
          <input
            :id="'child-name-' + index"
            v-model="child.name"
            type="text"
            class="text-sm font-normal leading-6 text-black outline-none"
            autocomplete="on"
          />
        </div>

        <!-- Инпут для возраста ребенка -->
        <div class="mb-0 flex flex-1 flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
          <label :for="'child-age-' + index" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Возраст</label>
          <input
            :id="'child-age-' + index"
            v-model="child.age"
            type="number"
            class="text-sm font-normal leading-6 text-black outline-none"
            min="0"
            max="120"
          />
        </div>

        <!-- Кнопка удаления -->
        <button @click="removeChild(index)" class="text-sm text-[#01A7FD] hover:underline">Удалить</button>
      </div>

      <!-- Кнопка сохранения -->
      <button
        @click="inputStore.saveData"
        :disabled="!isInputInfoFull"
        :class="{ invisible: !isInputInfoFull }"
        class="mr-auto rounded-full bg-[#01A7FD] px-5 py-[10px] text-sm font-normal leading-6 text-white hover:bg-[#0F79AF] focus:outline-2 focus:outline-[#1111117A] active:bg-[#59C79F]"
      >
        Сохранить
      </button>
    </div>
  </main>
</template>
