const express = require('express');

const AuthMiddleware = require('../middlewares/auth');
const { EntriesController } = require('../controllers');

const router = express.Router();

router.use(AuthMiddleware.isAdmin);

router.get('/', EntriesController.list);

module.exports = router;
