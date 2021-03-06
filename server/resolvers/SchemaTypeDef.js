const { gql } = require("apollo-server");

// The GraphQL schema
typeDefs = gql`
  type User {
    id: Int
    username: String
    email: String
    password: String
    imageUrl: String
    token: String
    createdAt: String!
    latestMessage: Message
  }
  type Message {
    id: Int
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String
    updatedAt: String
    reactions: [Reaction]
  }
  type Reaction {
    uuid: String!
    content: String
    user: User
    message: Message
    createdAt: String
    updatedAt: String
  }
  type Query {
    getUsers: [User]!
    getUser(id: Int!): User
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }
  type Mutation {
    register(username: String!, email: String, password: String!): User!
    createMessage(content: String!, to: String!): Message!
    reactToMessage(uuid: String!, content: String!): Reaction!
  }

  type Subscription {
    newMessage: Message!
    newReaction: Reaction!
  }

  # schema {
  #   query: Query
  #   mutation: Mutation
  #   subscription: Subscription
  # }
`;

module.exports = typeDefs;
