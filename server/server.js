const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req: req || {} }), // Ensure req is not undefined
});

const app = express();
app.use(authMiddleware);

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
