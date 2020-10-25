const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const contextMiddlware = async (ctx) => {
  let token;
  let user;
  if (ctx.req && ctx.req.headers.authorization) {
    token = ctx.req.headers.authorization.split("Bearer ")[1] || "";
    
    // check for invalid token - synchronous
  } else if (ctx.connection && ctx.connection.context.Authorization) {
    console.log("subscription token is ", ctx.connection.context.Authorization);
    token = ctx.connection.context.Authorization.split("Bearer ")[1] || "";
  }
  if (token) {
    user = await jwt.verify(token, process.env.JWT_SECRET);
    ctx.user = user;
  }
  
  ctx.pubsub = pubsub;
  console.info("is context ", ctx.user)
  return ctx;
};

module.exports = contextMiddlware;

// get the user token from the headers
// const token = req.headers.authorization || "";

// try to retrieve a user with the token
// const user = getUser(token);

// optionally block the user
// we could also check user roles/permissions here
// if (!user) throw new AuthenticationError("you must be logged in");

// add the user to the context
// return { user };
// console.log(req)
