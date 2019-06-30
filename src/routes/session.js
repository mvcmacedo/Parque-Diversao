const express = require('express');

const { SessionController } = require('../controllers');

const router = express.Router();

router.post('/', SessionController.create);

module.exports = router;
