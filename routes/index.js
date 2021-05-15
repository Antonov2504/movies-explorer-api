const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  celebrateLogin,
  celebrateCreateUser,
} = require('../utils/utils');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./movies');
const notFoundRouter = require('./notFoundRouter');

router.post('/signin', celebrateLogin, login);
router.post('/signup', celebrateCreateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, cardsRouter);
router.use('*', notFoundRouter);

module.exports = router;
