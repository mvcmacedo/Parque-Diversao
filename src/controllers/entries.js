const R = require('ramda');

const { Error, response } = require('../helpers');
const { EntriesService } = require('../services');

class EntriesController {
  static async list(req, res) {
    try {
      const pick = ['after', 'before', 'month', 'day', 'groupBy', 'order'];
      const filters = R.pick(pick, req.query);

      const entries = await EntriesService.get(filters).catch((err) => {
        throw new Error(`List entries failed: ${err.message}`);
      });

      return response(res, 200, null, entries);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = EntriesController;
