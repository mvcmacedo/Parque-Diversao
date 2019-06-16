const R = require('ramda');

const { User } = require('../models');

class SessionController {
  static async create(req, res) {
    try {
      const pick = ['email', 'username', 'password'];
      const data = R.pick(pick, req.body);

      const user = await User.findOne({ where: R.omit(['password'], data) });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const validPassword = await user.checkPassword(data.password);

      if (!validPassword) {
        return res.status(401).json({ error: 'Wrong user or password' });
      }

      return res.status(201).json({ user, token: User.generateToken(user) });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = SessionController;
