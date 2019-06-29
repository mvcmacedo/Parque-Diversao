const express = require('express');

const { PassportController } = require('../controllers');
const AuthMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/budget', PassportController.budget);

router.use(AuthMiddleware);

router.get('/', PassportController.get);
router.post('/validate', PassportController.validate);
router.put('/buy/:id', PassportController.buy);

module.exports = router;
