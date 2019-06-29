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
}

module.exports = UserController;
