const express = require('express');

const { PassportController } = require('../controllers');

const router = express.Router();

router.get('/', PassportController.get);

router.post('/budget', PassportController.budget);

router.post('/validate', PassportController.validate);

router.put('/buy/:id', PassportController.buy);

module.exports = router;
