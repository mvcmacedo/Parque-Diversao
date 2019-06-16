const R = require('ramda');

const { Error, response } = require('../helpers');
const { User } = require('../models');

class SessionController {
  static async create(req, res) {
    try {
      const pick = ['email', 'username', 'password'];
      const data = R.pick(pick, req.body);

      const user = await User.findOne({ where: R.omit(['password'], data) });

      if (!user) {
        throw new Error('User not found', 404);
      }

      const validPassword = await user.checkPassword(data.password);

      if (!validPassword) {
        throw new Error('Wrong user password combination', 401);
      }

      return response(res, 201, null, { user, token: User.generateToken(user) });
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = SessionController;
