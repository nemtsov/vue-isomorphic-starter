import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Assume we have a universal API that returns Promises
// and ignore the implementation details
function fetchItem(id) {
  return Promise.resolve({ id, item: `item_${id}` });
}

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem: async function({ commit }, id) {
        commit('setItem', await fetchItem(id));
      }
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      }
    }
  });
}
