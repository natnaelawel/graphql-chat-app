const { AuthenticationError, withFilter } = require("apollo-server");
const contextMiddlware = require("../../utils/contextMiddleware");

const newReaction = {
  subscribe: withFilter(
    (_, __, ctx, info) => ctx.pubsub.asyncIterator("NEW_REACTION"),
    async (payload, variables, context, info) => {
        const message = await payload.newReaction.getMessage()
        console.log('reaction subscribtion ', message)
      if (
        message.from === context.user.username ||
        message.to === context.user.username
      ) {
        return true;
      }
      return false;
    }
  ),
};

module.exports = {
  newReaction,
};
