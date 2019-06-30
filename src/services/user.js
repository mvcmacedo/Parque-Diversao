const R = require('ramda');

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

  static async update(data, filters = {}) {
    if (R.isEmpty(filters)) {
      throw new Error('Filters not sent');
    }

    await User.update(data, { where: filters }).catch((err) => {
      throw new Error(`Update user failed: ${err.message}`);
    });
  }
}

module.exports = UserService;
