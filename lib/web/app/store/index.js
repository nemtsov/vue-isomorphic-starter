import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Assume we have a universal API that returns Promises
// and ignore the implementation details
function fetchItem(id) {
  return Promise.resolve({
    id,
    item: {
      title: `item.title: ${id}`,
    }
  });
}

export function createStore() {
  return new Vuex.Store({
    state: {
      env: {},
      items: {}
    },

    actions: {
      fetchItem: async function({ commit }, id) {
        commit('setItem', await fetchItem(id));
      }
    },

    mutations: {
      setEnv(state, env) {
        Vue.set(state, 'env',  env);
      },

      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      }
    }
  });
}
