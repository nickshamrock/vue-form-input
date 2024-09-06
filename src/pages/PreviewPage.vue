<script setup>
import { ref, onMounted } from 'vue';

const userName = ref('Имя');
const userAge = ref(0);
const children = ref([]);

// Получаем из localStorage данные, которые ввели в HomePage
onMounted(() => {
  const savedData = localStorage.getItem('formData');

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    userName.value = parsedData.userName;
    userAge.value = parsedData.userAge;
    children.value = parsedData.children;
  }
});

//Функция, которая меняет "год", "года" и "лет" в зависимости от возраста пользователя или ребенка
const getAgeSuffix = (age) => {
  if (age % 10 === 1 && age % 100 !== 11) {
    return 'год';
  } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
    return 'года';
  } else {
    return 'лет';
  }
};

// условие показа дисклеймера "Вы не указали детей", если нет инфы по детям из массива children, который мы заполняем из localStorage.
const hasValidChildren = () => {
  return children.value.some((child) => child.name.trim() !== '' || child.age !== '');
};
//условия показа дисклеймера "Вы не указали все данные", если пользователь ввел не все персональные данные
const hasValidUser = () => {
  return userName.value.trim() !== '' && userAge.value !== null;
};
</script>

<template>
  <section class="h-full min-h-[616px] px-[51px] py-[30px]">
    <div class="flex gap-[34px] text-base">
      <!-- Оставил место для аватара согласно макету в Figma -->
      <div class="w-full max-w-[290px] max-md:hidden"></div>
      <!-- Оставил место для аватара согласно макету в Figma -->

      <!-- Здесь отображаются данные из страницы HomePage -->
      <div class="flex w-full max-w-[197px] flex-col gap-[60px]">
        <div class="flex flex-col gap-5">
          <h2 class="font-medium">Персональные данные</h2>
          <p v-if="!hasValidUser()">Вы не указали данные</p>
          <span v-else class="font-bold">{{ userName }}, {{ userAge }} {{ getAgeSuffix(userAge) }} </span>
        </div>
        <!-- Здесь отображаются данные детей из страницы HomePage -->
        <div>
          <h3 class="mb-5 font-medium">Дети</h3>
          <p v-if="!hasValidChildren()">Вы не указали детей</p>
          <ul v-else class="flex flex-col gap-5">
            <li v-for="(child, index) in children" :key="index" class="w-fit rounded-[5px] bg-[#F1F1F1] px-5 py-[10px] font-bold">
              {{ child.name.trim() }}, {{ child.age }} {{ getAgeSuffix(child.age) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
