import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth'
import meetups from './modules/meetups'
import categories from './modules/categories'
import threads from './modules/threads'
import stats from './modules/stats'
import meta from './modules/meta'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    meetups,
    categories,
    threads,
    stats,
    meta
  },
  // Functions to mutate a state.
  mutations: {
    setItems (state, {resource, items}) {
      state[resource].items = items;
    },
    setItem (state, {resource, item}) {
      state[resource].item = item;
    },
    addItemToArray (state, {item, index, resource}) {
      Vue.set(state[resource].items, index, item);
    }
  }
});