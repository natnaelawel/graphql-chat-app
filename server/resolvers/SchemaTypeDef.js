const { gql } = require("apollo-server");

// The GraphQL schema
typeDefs = gql`
  input ItemWhereInput {
    id: Int
  }
  type User {
    id: Int,
    username: String,
    email: String,
    password: String,
    imageUrl: String
  }
  type Query {
    getUsers: [User]!,
    getUser(id: Int!): User,
    login(username: String!, password: String!): User!
  }
  type Mutation {
    register(username: String!, email: String, password: String!): User!
  }
`;

module.exports = typeDefs;
