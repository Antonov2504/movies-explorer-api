const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorHandler = require('../errors/error-handler');
const ValidationError = require('../errors/validation-error');
const { messages } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/constants');

const {
  castErrorMessage,
  emptySignupMessage,
  mongoDuplicateEmailErrorMessage,
  userNotFoundErrorMessage,
  validationErrorMessage,
} = messages;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new ValidationError(emptySignupMessage);
    next(error);
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      errorHandler(err, next, {
        validationErrorMessage,
        mongoDuplicateEmailErrorMessage,
      });
    });
};

module.exports.getUserInfo = (req, res, next) => User.findById(req.user._id)
  .orFail()
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    errorHandler(err, next, {
      documentNotFoundErrorMessage: userNotFoundErrorMessage,
    });
  });

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, next, {
        castErrorMessage,
        validationErrorMessage,
        documentNotFoundErrorMessage: userNotFoundErrorMessage,
        mongoDuplicateEmailErrorMessage,
      });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
