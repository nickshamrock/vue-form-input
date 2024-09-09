<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import PlusButton from '@/components/icons/PlusButton.vue';

const children = ref([]);

const showChildInputs = ref(false);

const userName = ref('');
const userAge = ref(null);

// Функция переключения видимости меню инпутов для детей и добавления первого ребенка. Используется в кнопке "Добавить ребенка"
const toggleChildInputs = () => {
  if (!showChildInputs.value) {
    showChildInputs.value = true;
    addChild();
  } else if (children.value.length < 5) {
    addChild();
  }
};

const addChild = () => {
  if (children.value.length < 5) {
    children.value.push({ name: '', age: '' });
  }
};

// Функция удаления ребенка
const removeChild = (index) => {
  children.value.splice(index, 1);
  // Проверка: если нет больше детей, закрываем меню
  if (children.value.length === 0) {
    showChildInputs.value = false;
    //На случай, если пользователь случайно ввел данные о ребенке и мог удалить его из списка
    saveData();
  }
};

// Сохраняем и отправляем данные в localStorage, чтобы затем передать на страницу PreviewPage
const saveData = () => {
  const dataToSave = {
    userName: userName.value,
    userAge: userAge.value,
    children: children.value
  };
  localStorage.setItem('formData', JSON.stringify(dataToSave));
};

// Автоматическое сохранение введенных данных
watch([userName, userAge, children], () => {
  saveData();
});

onMounted(() => {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    userName.value = parsedData.userName || '';
    userAge.value = parsedData.userAge || null;
    children.value = parsedData.children || [];
    showChildInputs.value = children.value.length > 0; // Если есть дети, открываем форму для детей
  }
});

// Проверка, что все поля для персональных данных и детей заполнены. Если заполнено, то отрываеся кнопка "Сохранить"
const isInputInfoFull = computed(() => {
  const isPersonalComplete = userName.value.trim() !== '' && userAge.value !== null && userAge.value !== '';
  const areChildrenComplete = children.value.every((child) => child.name.trim() !== '' && child.age !== null && child.age !== '');
  return isPersonalComplete && areChildrenComplete;
});
</script>
<template>
  <main class="h-full min-h-[616px] px-4 py-[30px]">
    <!-- Первая форма с перс. данными -->
    <div class="relative mx-auto mb-11 flex w-full max-w-[616px] flex-col max-[360px]:mb-24">
      <h1 class="mb-5 text-base font-medium">Персональные данные</h1>
      <!-- Первый инпут c именем -->
      <div class="mb-[10px] flex flex-col rounded px-4 pb-[6px] pt-2 outline outline-2 outline-[#F1F1F1] hover:shadow-lg">
        <label for="name" class="text-[13px] font-normal leading-[15.85px] text-[#1111117A]">Имя</label>
        <input
          v-model="userName"
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
          v-model="userAge"
          id="age"
          type="number"
          class="text-sm font-normal leading-6 text-black outline-none"
          min="0"
          max="120"
        />
      </div>

      <!-- Кнопка для открытия меню и добавления ребенка, меню закрывается, когда удалены все инпуты из второй формы -->
      <button
        class="absolute bottom-[-77px] right-0 ml-auto flex items-center rounded-full border-2 border-[#01A7FD] px-5 py-[10px] outline-[#1111117A] hover:bg-[#6E41E20A] focus:outline-2 active:bg-[#6E41E229]"
        @click="toggleChildInputs"
        :disabled="children.length >= 5"
        :class="{ invisible: children.length >= 5 }"
      >
        <PlusButton />
        <span class="ml-2 text-sm font-normal leading-6 text-[#01A7FD]"> Добавить ребенка </span>
      </button>
    </div>
    <!-- Конец первой формы с перс.данными -->

    <!-- Начало второй формы с инпутами для детей -->
    <div v-show="showChildInputs" class="mx-auto flex w-full max-w-[616px] flex-col">
      <h2 class="mb-5 text-base font-medium">Дети (макс. 5)</h2>
      <div v-for="(child, index) in children" :key="index" class="mb-[10px] flex flex-wrap gap-[18px] last-of-type:mb-[30px]">
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
      <!-- Кнопка cохранения -->
      <button
        @click="saveData"
        :disabled="!isInputInfoFull"
        :class="{ invisible: !isInputInfoFull }"
        class="mr-auto rounded-full bg-[#01A7FD] px-5 py-[10px] text-sm font-normal leading-6 text-white hover:bg-[#0F79AF] focus:outline-2 focus:outline-[#1111117A] active:bg-[#59C79F]"
      >
        Сохранить
      </button>
    </div>
    <!-- Конец второй формы с инпутами для детей -->
  </main>
</template>
