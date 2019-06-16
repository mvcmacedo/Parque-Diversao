const express = require('express');

const { PromotionController } = require('../controllers');

const router = express.Router();

router.get('/', PromotionController.list);

module.exports = router;
