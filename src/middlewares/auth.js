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

  static isAdmin(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const isAdmin = req.user.is_admin;

      if (!isAdmin) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }
}

module.exports = AuthMiddleware;
