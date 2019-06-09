const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//impoprt typeDefs and resolvers
const filepath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filepath, "utf-8");
const resolvers = require("./resolvers");

//import Environment variables and Mongoose models
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

//Connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(error => {
    console.log(error);
  });

//create Apollo/GraphQL Server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

//Listing
server.listen(4000).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
