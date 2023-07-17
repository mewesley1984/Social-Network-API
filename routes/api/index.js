const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/thoughts', require('./thoughts'));
router.use('/reactions', require('./reactions'));

module.exports = router;
