<template>
  <v-container text-xs-center>

    <v-layout row>
      <v-dialog
        v-model="loading"
        persistent
        fullscreen
      >
        <v-container fill-height>
          <v-layout
            row
            justify-center
            align-center
          >
            <v-progress-circular
              indeterminate
              :size="70"
              :width="7"
              color="secondary"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <v-flex xs12>
      <v-carousel
        v-if="!loading"
        &&
        posts.lenght
      > 0"
        v-bind="{ 'cycle': true }"
        interval="3000"
        >
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 id="carousel__title">{{ post.title }}></h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  methods: {
    handlegetCarouselposts() {
      //reach out to the store actions
      this.$store.dispatch("getPosts");
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    loading() {
      this.$store.getters.loading;
    }
  },
  mounted() {
    this.handlegetCarouselposts();
  }
};
</script>
