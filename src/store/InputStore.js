// store/InputStore.js
import { defineStore } from 'pinia';

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    userName: '' // Здесь будем хранить имя пользователя
  })
  //   actions: {
  //     // Экшен для обновления имени пользователя
  //     updateUserName(newName) {
  //       this.userName = newName;
  //     }
  //   }
});
