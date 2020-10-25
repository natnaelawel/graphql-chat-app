require("dotenv").config();
const { Op } = require("sequelize");
const { UserInputError, PubSub } = require("apollo-server");
const { User, Message } = require("../../models");

// const pubsub = new PubSub()
// const pubsub = require("../index");

const createMessage = async (_, args, ctx, info) => {
  const { user } = ctx;
  const { content, to } = args;
  try {
    const receiver = await User.findOne({ where: { username: to } });
    if (receiver.username === user.username) {
      throw new UserInputError("You can't send Message To your self");
    }
  } catch (error) {
    throw new UserInputError("No receiver");
  }
  try {
    // TODO validate input data

    // TODO check if username/email exists

    // TODO hash the password
    // TODO create user
    const message = await Message.create({
      content,
      to,
      from: user.username,
    });

    ctx.pubsub.publish("NEW_MESSAGE", { newMessage: message });
    // return user to client
    return message;
  } catch (error) {
    console.log(error);
    throw new UserInputError("Bad Input", { error: error });
  }
};

module.exports = {
  createMessage,
};
