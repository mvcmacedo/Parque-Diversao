const R = require('ramda');

const { response } = require('../helpers');
const { PromotionService } = require('../services');

class PromotionController {
  static async list(req, res) {
    try {
      const pick = ['id'];
      const filters = R.pick(pick, req.body);

      const promotions = await PromotionService.get({ ...filters, is_active: true });

      return response(res, 200, null, promotions);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = PromotionController;
