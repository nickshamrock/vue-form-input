import { defineStore } from 'pinia';

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    userName: '',
    userAge: null,
    children: [],
    savedChildren: [] // show in the PreviewPage
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
      this.saveChildren();
    },

    saveData() {
      this.saveChildren();
    },

    saveChildren() {
      this.savedChildren = [...this.children];
    }
  }
});
