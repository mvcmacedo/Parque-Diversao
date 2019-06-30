const R = require('ramda');

const { Error, response } = require('../helpers');
const { PromotionService } = require('../services');

class PromotionController {
  static async list(req, res) {
    try {
      const pick = ['is_active'];
      const filters = R.pick(pick, req.query);

      const promotions = await PromotionService.get(filters).catch((err) => {
        throw new Error(`List promotions failed: ${err.message}`);
      });

      return response(res, 200, null, promotions);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('Filter not sent', 400);
      }

      const pick = ['is_active'];
      const data = R.pick(pick, req.body);

      await PromotionService.update({ id }, data).catch((err) => {
        throw new Error(`Update promotion ${id} failed: ${err.message}`);
      });

      const [promotion] = await PromotionService.get({ id });

      return response(res, 200, null, promotion);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = PromotionController;
