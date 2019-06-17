const express = require('express');

const AuthMiddleware = require('../middlewares/auth');
const { SaleController } = require('../controllers');

const router = express.Router();

router.use(AuthMiddleware.isAdmin);

router.get('/', SaleController.list);

module.exports = router;
