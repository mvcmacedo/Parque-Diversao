const { Promotion } = require('../models');

class PromotionService {
  static async get(filters = {}) {
    const promotions = await Promotion.findAll({ where: filters });

    return promotions;
  }
}

module.exports = PromotionService;
