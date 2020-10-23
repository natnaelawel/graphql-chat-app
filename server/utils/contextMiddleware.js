const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server");

const contextMiddlware = (ctx) => {
  if (ctx.req && ctx.req.headers.authorization) {
    console.log(ctx.req);
    const token = ctx.req.headers.authorization.split("Bearer ")[1] || "";

    // check for invalid token - synchronous
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded user iss", user);
      ctx.user = user;
    } catch (err) {
      // err
      console.log(err);
      throw new AuthenticationError("UnAuthenticated");
    }
    return ctx;
  }
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
