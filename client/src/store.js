import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "./main";
import { gql } from "apollo-boost";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit("setLoading", true);
      //use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
              }
            }
          `
        })
        .then(({ data }) => {
          //get data from actions to state iva mustation
          //commit will pass data from actions to mutation
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
});
