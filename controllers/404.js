const errorHandler = require('../errors/error-handler');
const RouterNotFoundError = require('../errors/router-not-found-error');

module.exports.notFoundRouter = (req, res, next) => {
  const err = new RouterNotFoundError();
  errorHandler(err, next, {
    RouterNotFoundErrorMessage: 'Запрашиваемый ресурс не найден',
  });
};
