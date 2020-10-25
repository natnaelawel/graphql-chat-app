const Mutation = require("./Mutation");
const Query = require("./Query");
const Subscription = require("./Subscription");

const { User, Message } = require("../models");

const resolvers = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Reaction: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    message: async (parent) => await Message.findByPk(parent.messageId),
    user: async (parent) =>
      await User.findByPk(parent.userId, {
        attributes: ["username", "imageUrl", "createdAt"],
      }),
  },
  Query: Query,
  Mutation: Mutation,
  Subscription: Subscription,
};

module.exports = resolvers;
