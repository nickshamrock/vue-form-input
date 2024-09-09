// store/InputStore.js
import { defineStore } from 'pinia';

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    userName: '',
    userAge: null,
    children: []
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
        this.children.push({ name: '', age: null });
      }
    },

    removeChild(index) {
      this.children.splice(index, 1);
    },

    updateChild(index, newName, newAge) {
      if (index >= 0 && index < this.children.length) {
        this.children[index].name = newName;
        this.children[index].age = newAge;
      }
    }
  }
});
