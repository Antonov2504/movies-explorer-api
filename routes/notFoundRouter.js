const router = require('express').Router();
const { notFoundRouter } = require('../controllers/404');

router.get('/', notFoundRouter);

module.exports = router;
