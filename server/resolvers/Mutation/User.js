const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
const { User } = require("../../models");



const register =  async (_, args, ctx, info) => {
    const { username, email, password } = args;
    let hashedPassword;
    try {
      // TODO validate input data

      // TODO check if username/email exists

      // TODO hash the password
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed password is ", hashedPassword);
      // TODO create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      // return user to client
      return user;
    } catch (error) {
      console.log(error);
      throw new UserInputError("Bad Input", { error: error });
    }
  }

  module.exports = {
      register
  }