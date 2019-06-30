const express = require('express');

const AuthMiddleware = require('../middlewares/auth');
const { PromotionController } = require('../controllers');

const router = express.Router();

router.get('/', PromotionController.list);

router.use(AuthMiddleware.isAdmin);

router.put('/:id', PromotionController.update);

module.exports = router;
