const errorHandler = require('../errors/error-handler');
const RouterNotFoundError = require('../errors/router-not-found-error');
const { messages } = require('../utils/constants');

const { routerNotFoundErrorMessage } = messages;

module.exports.notFoundRouter = (req, res, next) => {
  const err = new RouterNotFoundError();
  errorHandler(err, next, {
    routerNotFoundErrorMessage,
  });
};
