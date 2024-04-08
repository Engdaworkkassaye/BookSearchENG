// authMiddleware.js

const jwt = require('jsonwebtoken');
// const { secret, expiration } = require('./config'); // Assuming you have a config file with secret and expiration
const secret = 'mysecretsshhhhh';
const expiration = '2h';
module.exports = {
  authMiddleware: function (req, res, next) {
    // Check if it's a GraphQL mutation
      // Parse the mutation operation name
      const operationName = req.body.operationName
      
      // Exclude checking token for sign up mutation (addUser mutation)
      if (operationName === 'addUser') {
        return next();
      }
    

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (err) {
      console.log('Invalid token:', err);
      return res.status(401).json({ message: 'Invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
