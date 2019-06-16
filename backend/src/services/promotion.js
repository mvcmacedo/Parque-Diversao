const { Promotion } = require('../models');
const { Error } = require('../helpers');

class PromotionService {
  static async get(filters = {}) {
    const promotions = await Promotion.findAll({ where: filters }).catch((err) => {
      throw new Error(`Find promotions failed: ${err.message}`);
    });

    return promotions;
  }
}

module.exports = PromotionService;
