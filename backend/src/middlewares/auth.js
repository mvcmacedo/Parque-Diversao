const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { User } = require('../models');

const authConfig = require('../config/auth');

class AuthMiddleware {
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const { id } = await promisify(jwt.verify)(token, authConfig.secret);
      const user = await User.findOne({ where: { id } });

      req.user = user;

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}

module.exports = AuthMiddleware;
