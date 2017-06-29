import Vue from 'vue';

export default {
  namespaced: true,

  state: {
  },

  mutations: {
    set(state, env) {
      Object.keys(env).forEach((key) => {
        state[key] = env[key];
      });
    }
  }
}