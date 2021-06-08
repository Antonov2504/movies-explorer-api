const { celebrate, Joi } = require('celebrate');
const { urlRegex, nameRuRegex, nameEnRegex } = require('./constants');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9:%.,_+~#=@]+$/).required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/^[a-zA-Zа-яА-Я\sё-]{2,30}$/i).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9:%.,_+~#=@]+$/).required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/^[a-zA-Zа-яА-Я\sё-]{2,30}$/i).required(),
    email: Joi.string().email().required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(nameRuRegex),
    nameEN: Joi.string().required().pattern(nameEnRegex),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateMovie,
  validateMovieId,
  validateUserInfo,
};
