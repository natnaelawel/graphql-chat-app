const { ApolloServer } = require("apollo-server");
const typeDefs = require("./resolvers/SchemaTypeDef");
const { sequelize } = require("./models");

const contextMiddleware = require("./utils/contextMiddleware");
const resolvers = require('./resolvers')

// A map of functions which return data for the schema.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => {
    // if(ctx.req.headers){

    // console.log("data for context is ", ctx.connection);
    return contextMiddleware(ctx);
    // }else{
    // return
    // }
  },

  // subscriptions: {
  //   onConnect: (connectionParams, webSocket, context) => {
  //     // console.log(connectionParams, "is connection params");
  //     // console.log(context, " is context");
  //     // console.log("Connected to websocket", webSocket.upgradeReq);
  //     contextMiddleware(context)
  //   },
  // },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log("Database is connected!"))
    .catch((error) => console.log("Database connection error!"));
});
