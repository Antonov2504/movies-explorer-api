const CastError = require('./cast-error');
const ValidationError = require('./validation-error');
const ForbiddenError = require('./forbidden-error');
const DocumentNotFoundError = require('./document-not-found-error');
const RouterNotFoundError = require('./router-not-found-error');
const MongoDuplicateEmailError = require('./mongo-duplicate-email-error');
const ServerError = require('./server-error');

const errorHandler = (err, next, objErrorMessages) => {
  const {
    routerNotFoundErrorMessage,
    castErrorMessage,
    validationErrorMessage,
    documentNotFoundErrorMessage,
    mongoDuplicateEmailErrorMessage,
  } = objErrorMessages;
  let error;
  if (err.name === 'RouterNotFoundError') {
    error = new RouterNotFoundError(routerNotFoundErrorMessage);
  } else if (err.name === 'CastError') {
    error = new CastError(castErrorMessage);
  } else if (err.name === 'ValidationError') {
    error = new ValidationError(validationErrorMessage);
  } else if (err.name === 'ForbiddenError') {
    error = new ForbiddenError(err.message);
  } else if (err.name === 'DocumentNotFoundError') {
    error = new DocumentNotFoundError(documentNotFoundErrorMessage);
  } else if (err.name === 'MongoError' && err.code === 11000) {
    error = new MongoDuplicateEmailError(mongoDuplicateEmailErrorMessage);
  } else {
    error = new ServerError(err.message);
  }
  next(error);
};

module.exports = errorHandler;
