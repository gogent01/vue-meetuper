import Vue from 'vue';
import axios from "axios";
import axiosInstance from '@/services/axios';
import {applyFilters} from "@/helpers";

export default {
  namespaced: true,

  state: {
    isAllThreadsLoaded: false,
    items: []
  },
  getters: {

  },
  actions: {
    fetchThreads ({state, commit}, {meetupId, filter = {}, init}) {
      if(init) {
        commit('setItems', {resource: 'threads', items: []}, {root: true});
      }
      const url = applyFilters(`/api/v1/threads?meetupId=${meetupId}`, filter);
      return axios.get(url)
        .then(res => {
          const {threads, isAllDataLoaded} = res.data;
          commit('mergeThreads', threads);
          commit('setAllDataLoaded', isAllDataLoaded);
          return state.items;
        });
    },
    postThread ({state, commit}, {title, meetupId}) {
      const thread = {};
      thread.title = title;
      thread.meetup = meetupId;

      return axiosInstance.post('/api/v1/threads', thread)
        .then((res) => {
          const createdThread = res.data;
          const index = state.items.length;

          commit('addItemToArray', {item: createdThread, index, resource: 'threads'}, {root: true});
          return createdThread;
        });
    },
    sendPost ({dispatch}, {text, threadId}) {
      const post = {};
      post.text = text;
      post.thread = threadId;

      return axiosInstance.post('/api/v1/posts', post)
        .then((res) => {
          const createdPost = res.data;
          const threadId = createdPost.thread;

          dispatch('addPostToThread', {post: createdPost, threadId});
          return createdPost;
        });
    },
    addPostToThread ({state, commit}, {post, threadId}) {
      const allThreads = state.items;
      const index = allThreads.findIndex(aThread => aThread._id === threadId);
      if (index > -1) {
        const posts = [post, ...allThreads[index].posts];
        commit('savePostToThread', {posts, index});
      }
    }
  },
  mutations: {
    savePostToThread (state, {posts, index}) {
      Vue.set(state.items[index], 'posts', posts);
    },
    setAllDataLoaded (state, isAllDataLoaded) {
      state.isAllThreadsLoaded = isAllDataLoaded;
    },
    mergeThreads (state, threads) {
      state.items = [...state.items, ...threads];
    }
  }
}