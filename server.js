const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

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

//Verify JWT Token passed from client
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
      console.log(user);
    } catch (error) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      );
    }
  }
};

//create Apollo/GraphQL Server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { User, Post, currentUser: await getUser(token) };
  }
});

//Listing
server.listen(4000).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
