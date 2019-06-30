const express = require('express');

const { PassportController } = require('../controllers');
const AuthMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/budget', PassportController.budget);
router.post('/validate', PassportController.validate);

router.use(AuthMiddleware.authenticate);

router.get('/', PassportController.list);
router.put('/buy/:id', PassportController.buy);

module.exports = router;
