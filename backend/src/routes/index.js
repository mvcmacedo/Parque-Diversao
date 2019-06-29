const express = require('express');

const AuthMiddleware = require('../middlewares/auth');

const PassportRoute = require('./passport');
const SessionRoute = require('./session');
const PromotionRoute = require('./promotion');
const SaleRoute = require('./sale');
const EntriesRoute = require('./entries');
const UserRoutes = require('./user');

const router = express.Router();

router.use('/session', SessionRoute);
router.use('/passport', PassportRoute);

router.use(AuthMiddleware.authenticate);

router.use('/promotion', PromotionRoute);
router.use('/sale', SaleRoute);
router.use('/entries', EntriesRoute);
router.use('/user', UserRoutes);

module.exports = router;
