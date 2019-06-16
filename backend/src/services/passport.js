/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const R = require('ramda');

const { Promotion, Passport } = require('../models');

class PassportService {
  static async create(passport) {
    return Passport.create(passport);
  }

  static async applyPromotions({ promotions = {}, days = 1 }) {
    let cost = 100 * days;

    if (R.isEmpty(promotions)) {
      return cost;
    }

    /* eslint-disable no-continue */
    for (const id of promotions) {
      const promotion = await Promotion.findOne({ where: { id } });

      if (promotion.minimum_days === 0) {
        cost -= cost * (promotion.percentual / 100);
        continue;
      }

      if (promotion.minimum_days > days) {
        cost -= 0;
        continue;
      }

      let discount = 0;

      /* eslint-disable no-plusplus */
      for (let i = 1; i <= days; i++) {
        if (i < promotion.start_day) {
          discount += 0;
          continue;
        }

        discount += 100 * (promotion.percentual / 100);
      }

      cost -= discount;
    }

    return cost;
  }
}

module.exports = PassportService;
