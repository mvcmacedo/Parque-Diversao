const R = require('ramda');

const { Error, response } = require('../helpers');
const { SaleService } = require('../services');

class SaleController {
  static async list(req, res) {
    try {
      const pick = ['after', 'before', 'month', 'day', 'groupBy'];
      const filters = R.pick(pick, req.query);

      const sales = await SaleService.get(filters).catch((err) => {
        throw new Error(`List sales failed: ${err.message}`);
      });

      return response(res, 200, null, sales);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = SaleController;
