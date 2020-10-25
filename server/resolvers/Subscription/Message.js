// const { PubSub }= require("apollo-server")

const { AuthenticationError, withFilter } = require("apollo-server");
const contextMiddlware = require("../../utils/contextMiddleware");

// const pubsub = require('../index')
// export const newMessage = async(_, _, ctx, info)=>{
//     return pubsub.asyncIterator(['NEW'])
// }
const newMessage = {
  //   subscribe: withFilter(
  //     (_, __, ctx, info) => {
  //       console.log("context data is ", ctx);
  //       if(!ctx.user){
  //       throw new AuthenticationError('UnAuthenticated error')
  //       }
  //       return ctx.pubsub.asyncIterator("NEW_MESSAGE");
  //     },
  //     (parent, _, context) => {
  //       if (
  //         parent.newMessage.from === context.user.username ||
  //         parent.newMessage.to === context.user.username
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   ),

  subscribe: withFilter(
    (_, __, ctx, info) => ctx.pubsub.asyncIterator("NEW_MESSAGE"),
    async (payload, variables, context, info) => {
      if (
        payload.newMessage.dataValues.from === context.user.username ||
        payload.newMessage.dataValues.to === context.user.username
      ) {
        return true;
      }
      return false;
    }
  ),
};

module.exports = {
  newMessage,
};
