const R = require('ramda');

const { response } = require('../helpers');
const { UserService } = require('../services');

class UserController {
  static async list(req, res) {
    try {
      const users = await UserService.get();

      return response(res, 200, null, users);
    } catch (err) {
      const status = err.http_status || 500;

      return response(res, status, err);
    }
  }

  static async create(req, res) {
    try {
      const pick = ['name', 'username', 'email', 'password', 'age', 'is_student'];
      const data = R.pick(pick, req.body);

      const user = await UserService.create(data);

      return response(res, 201, null, user);
    } catch (err) {
      return response(res, 500, err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      const pick = ['is_admin'];
      const data = R.pick(pick, req.body);

      await UserService.update(data, { id });

      return response(res, 201, null);
    } catch (err) {
      return response(res, 500, err);
    }
  }
}

module.exports = UserController;
