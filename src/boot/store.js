// src/boot/store.js
import { createStore } from 'vuex';
import store from '../store';  

export default async ({ app }) => {
  app.use(store);
};
