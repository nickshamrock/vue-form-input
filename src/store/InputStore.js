import { defineStore } from 'pinia';

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    userName: '',
    userAge: null,
    children: [], // Массив для детей
    savedChildren: [] // Новый массив для сохраненных данных о детях
  }),
  actions: {
    updateUserName(newName) {
      this.userName = newName;
    },
    updateUserAge(newAge) {
      this.userAge = newAge;
    },
    addChild() {
      if (this.children.length < 5) {
        this.children.push({ name: '', age: '' });
      }
    },
    removeChild(index) {
      this.children.splice(index, 1);
    },
    saveChildren() {
      this.savedChildren = [...this.children];
    },
    saveData() {
      this.saveChildren();
    }
  }
});
