<template>
  <v-container>
    <h1>Home</h1>
    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{result: { loading, data, error, networkStatus }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else-if="networkStatus">{{ networkStatus }}</div>
        <ul
          v-else
          v-for="post in data.getPosts"
          :key="post._id"
        >
          <li>
            {{ post.title }}
            {{ post.imageUrl }}
            {{ post.likes }}
          </li>
        </ul>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",

  data() {
    return {
      getPostsQuery: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `
    };
  }
};
</script>
