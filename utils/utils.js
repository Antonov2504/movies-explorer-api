const { celebrate, Joi } = require('celebrate');

module.exports.celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  }),
});

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/[\wа-я\sё]{2,30}/i),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
