const { User } = require('../models');
const { Error } = require('../helpers');

class UserService {
  static async get(filters = {}) {
    const users = await User.findAll({ where: filters }).catch((err) => {
      throw new Error(`Find users falied: ${err.message}`);
    });

    return users;
  }

  static async create(data) {
    return User.create(data);
  }
}

module.exports = UserService;
