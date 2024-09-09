import { defineStore } from 'pinia';

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    testText: 'Привет, я из хранилища Pinia!'
  })
});
