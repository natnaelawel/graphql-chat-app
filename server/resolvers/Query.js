const { User} =require('../models')

module.exports = {
  async getUsers(parent, args, ctx, info) {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.log(error);
    }
    return users;
  },
  async getUser(_, args, ctx, info) {
    try {
      const user = await User.findOne({ where: { id: args.id } });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async login(_, args, ctx, info) {
    try {
      const user = await User.findOne({ where: { id: args.id } });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};