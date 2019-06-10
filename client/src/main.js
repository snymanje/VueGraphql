import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApolloClient from "apollo-boost";

import "./plugins/vuetify";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  //include auth token with requests to backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    //operation adds the token to an auth header which is sent to backend
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphqlErrors, networkErrors }) => {
    if (networkErrors) {
      console.log("Network Error");
    }

    if (graphqlErrors) {
      for (let err of graphqlErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    //execute getCurrentuser query
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");
