const R = require('ramda');

const { PromotionService } = require('../services');

class PromotionController {
  static async list(req, res) {
    try {
      const pick = ['id'];
      const filters = R.pick(pick, req.body);

      const promotions = await PromotionService.get({ ...filters, is_active: true });

      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = PromotionController;
