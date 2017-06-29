import Vue from 'vue';

// Assume we have a universal API that returns Promises
// and ignore the implementation details
function fetchItem(id) {
  return Promise.resolve({
    id,
    item: {
      title: `item.title: ${id || ''}`,
    }
  });
}

export default {
  namespaced: true,

  state: {
  },

  getters: {
    getItem(state) {
      return (id) => {
        return state[id];
      };
    }
  },

  actions: {
    fetchItem: async function({ commit }, id) {
      commit('set', await fetchItem(id));
    }
  },

  mutations: {
    set(state, { id, item }) {
      Vue.set(state, id, item);
    }
  }
}