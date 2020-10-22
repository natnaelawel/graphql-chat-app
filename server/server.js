const { ApolloServer } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const typeDefs = require("./resolvers/SchemaTypeDef");
const {sequelize} = require('./models');

// A map of functions which return data for the schema.
const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: sequelize
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(()=> console.log('Database is connected!'))
    .catch((error) => console.log('Database connection error!'))
});
