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
    # getUser(): User,
  }
  type Mutation {
    register(username: String!, email: String, password: String!): User!
  }
`;

module.exports = typeDefs;
