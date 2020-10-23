const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
const { User, Message } = require("../../models");
const { Op } = require("sequelize");



const getMessages = async (_, args, ctx, info) => {
  const { user } = ctx;
  const { from } = args;

  try {
    const receiver = await User.findOne({
      where: { username: from.trim() },
    });
    console.log("recievers is ", receiver);
    // if (!receiver) {
    //   throw new UserInputError("Receiver user is not found");
    // }
    const usernames = [receiver.username, user.username];
    console.log("usersnames are ", usernames[0]);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { from: { [Op.in]: usernames } },
          { to: { [Op.in]: usernames } },
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    const newMessages = messages.map((message) => {
      message.createdAt = message.createdAt.toISOString();
      return message;
    });
    console.log("messages are ", newMessages);
    return newMessages;
  } catch (error) {
    throw new UserInputError("There is no message");
  }
};

module.exports = {
    getMessages
}