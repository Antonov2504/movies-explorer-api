const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateLogin,
  validateCreateUser,
} = require('../utils/utils');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./movies');
const notFoundRouter = require('./notFoundRouter');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, cardsRouter);
router.use('*', notFoundRouter);

module.exports = router;
