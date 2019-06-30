const express = require('express');

const AuthMiddleware = require('../middlewares/auth');
const { UserController } = require('../controllers');

const router = express.Router();

router.post('/', UserController.create);

router.use(AuthMiddleware.authenticate, AuthMiddleware.isAdmin);

router.get('/', UserController.list);
router.put('/:id', UserController.update);

module.exports = router;
