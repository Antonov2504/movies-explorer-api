const router = require('express').Router();
const { notFoundRouter } = require('../controllers/404');

router.get('/', notFoundRouter);
router.post('/', notFoundRouter);
router.put('/', notFoundRouter);
router.patch('/', notFoundRouter);
router.delete('/', notFoundRouter);
router.copy('/', notFoundRouter);

module.exports = router;
