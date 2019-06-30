const R = require('ramda');

const { Promotion } = require('../models');
const { Error } = require('../helpers');

class PromotionService {
  static async get(filters = {}) {
    const promotions = await Promotion.findAll({ where: filters }).catch((err) => {
      throw new Error(`Find promotions failed: ${err.message}`);
    });

    return promotions;
  }

  static async update(filters, data) {
    if (R.isEmpty(filters)) {
      throw new Error('Filters not sent');
    }

    await Promotion.update(data, { where: filters }).catch((err) => {
      throw new Error(`Update promotion failed: ${err.message}`);
    });
  }
}

module.exports = PromotionService;
