import axios from "axios";

export default {
  namespaced: true,

  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchCategories ({state, commit}) {
      commit('setItem', {resource: 'categories', items: []}, {root: true});
      return axios.get('/api/v1/categories')
        .then(res => {
          const categories = res.data;
          commit('setItems', {resource: 'categories', items: categories}, {root: true});
          return state.items;
        });
    },
  },
  mutations: {

  }
}