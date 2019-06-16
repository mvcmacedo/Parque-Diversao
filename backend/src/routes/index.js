const express = require('express');

const AuthMiddleware = require('../middlewares/auth');

const PassportRoute = require('./passport');
const SessionRoute = require('./session');
const PromotionRoute = require('./promotion');

const router = express.Router();

router.use('/session', SessionRoute);

router.use(AuthMiddleware.authenticate);

router.use('/passport', PassportRoute);
router.use('/promotion', PromotionRoute);

module.exports = router;
