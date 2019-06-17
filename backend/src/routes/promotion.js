const express = require('express');

const AuthMiddleware = require('../middlewares/auth');
const { PromotionController } = require('../controllers');

const router = express.Router();

router.use(AuthMiddleware.isAdmin);

router.get('/', PromotionController.list);
router.put('/:id', PromotionController.update);

module.exports = router;
