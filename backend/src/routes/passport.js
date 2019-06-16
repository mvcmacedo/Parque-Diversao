const express = require('express');

const { PassportController } = require('../controllers');

const router = express.Router();

router.get('/', PassportController.get);

router.post('/budget', PassportController.budget);

router.put('/buy', PassportController.buy);

module.exports = router;
