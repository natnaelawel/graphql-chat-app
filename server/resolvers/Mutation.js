const bcrypt = require("bcrypt");
const {UserInputError} = require("apollo-server")
const { User } = require("../models");

module.exports = {
  async register(_, args, ctx, info) {
    const { username, email, password } = args;
    let hashedPassword;
    try {
      // TODO validate input data

      // TODO check if username/email exists

      // TODO hash the password
      hashedPassword =  await bcrypt.hash(password,10);
      console.log('hashed password is ', hashedPassword)
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
      throw new UserInputError("Bad Input",{error: error});
    }
  },
};

// const match = await bcrypt.compare(password, user.passwordHash);

// if (match) {
//   //login
// }
