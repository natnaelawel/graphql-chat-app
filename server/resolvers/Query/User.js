const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
const { User, Message } = require("../../models");
const { Op } = require("sequelize");

const getUsers = async (parent, args, ctx, info) => {
  const { user } = ctx;
  let users = []
  try {
    // try to exclude the logged in user from the list
    users = await User.findAll({
      attributes: ["username", "imageUrl", "createdAt"],
      where: { username: { [Op.ne]: user.username } },
    });

    const allUserMessages = await Message.findAll({
      where: {
        [Op.or]: [{ from: user.username }, { to: user.username }],
      },
      order: [["createdAt", "DESC"]],
    });

    users = users.map((singleUser) => {
      const latestMessage = allUserMessages.find((singleMessage) => {
        return singleMessage.from === singleUser.username || singleMessage.to === singleUser.username;
      });
      singleUser.latestMessage = latestMessage;
      return singleUser
    });

    // return users;
  } catch (error) {
    console.log(error);
  }
  return users;
};

const getUser = async (_, args, ctx, info) => {
  const { id } = args;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new UserInputError("user is not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (_, args, ctx, info) => {
  const { username, password } = args;
  if (username.trim() === "" || password === "") {
    throw new UserInputError("Username or password is Empty!");
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new UserInputError("user is not found");
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new AuthenticationError("Invalid username or password!");
    }
    const token = jwt.sign(
      {
        username: user.username,
        imageUrl: user.imageUrl
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
    console.log(user, "is user");
    return {
      ...user.dataValues,
      createdAt: user.createdAt.toISOString(),
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUser,
  login,
};
