import Vue from 'vue';
import Vuex from 'vuex';
import env from './modules/env';
import items from './modules/items';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      env,
      items,
    }
  });
}