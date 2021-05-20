const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { JWT_SECRET } = require('../utils/constants');
const { messages } = require('../utils/constants');

const { authErrorMessage } = messages;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new AuthError(authErrorMessage);
    next(error);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    const error = new AuthError(authErrorMessage);
    next(error);
  }
  req.user = payload;
  return next();
};
