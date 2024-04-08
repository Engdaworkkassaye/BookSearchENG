const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
    },
    addUser: async (parent, { username, email, password }) => {
    },
    saveBook: async (parent, { bookData }, context) => {
    },
    removeBook: async (parent, { bookId }, context) => {
    },
  },
};

module.exports = resolvers;
