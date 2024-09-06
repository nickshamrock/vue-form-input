<script setup>
import AppLogo from './icons/AppLogo.vue';
</script>
<template>
  <header class="h-auto min-h-[76px] w-full border-b border-[#1111111A] px-[51px] py-[22px]">
    <nav class="flex flex-wrap items-center">
      <div class="max-[420px]:m-auto">
        <AppLogo />
      </div>
      <div class="ml-auto mr-auto flex gap-6 text-sm font-normal leading-6 text-[#1111117A] max-[420px]:mt-5">
        <RouterLink to="/" class="hover:underline">Форма</RouterLink>
        <RouterLink to="/preview" class="hover:underline">Превью</RouterLink>
      </div>
    </nav>
  </header>
</template>
