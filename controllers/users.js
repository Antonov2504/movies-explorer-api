const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorHandler = require('../errors/error-handler');
const ValidationError = require('../errors/validation-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new ValidationError('Необходимо заполнить поля Имя, Почта и Пароль');
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
        ValidationErrorMessage: 'Ошибка валидации данных',
        MongoDuplicateEmailErrorMessage: 'Пользователь с таким Email уже зарегистрирован',
      });
    });
};

module.exports.getUserInfo = (req, res, next) => User.findById(req.user._id)
  .orFail()
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    errorHandler(err, next, {
      DocumentNotFoundErrorMessage: 'Пользователь с указанным id не найден',
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
        CastErrorMessage: 'Переданы некорректные данные',
        ValidationErrorMessage: 'Ошибка валидации данных',
        DocumentNotFoundErrorMessage: 'Пользователь с указанным id не найден',
        MongoDuplicateEmailErrorMessage: 'Пользователь с таким Email уже зарегистрирован',
      });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
