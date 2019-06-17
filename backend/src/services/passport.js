/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const R = require('ramda');
const moment = require('moment');

const { Error } = require('../helpers');
const { Promotion, Passport, PassportPromotion } = require('../models');

class PassportService {
  static async create(data) {
    const passport = await Passport.create(data).catch((err) => {
      throw new Error(`Create passport failed: ${err.message}`);
    });

    return passport;
  }

  static async get(filters = {}) {
    const passports = await Passport.findAll({ where: filters }).catch((err) => {
      throw new Error(`Get passports failed: ${err.message}`);
    });

    return passports;
  }

  static async update(data, filters = {}) {
    if (R.isEmpty(filters)) {
      throw new Error('Filters not sent');
    }

    await Passport.update(data, { where: filters }).catch((err) => {
      throw new Error(`Update passport failed: ${err.message}`);
    });
  }

  static async applyPromotions({ promotions = [], days = 1 }) {
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

    return cost.toFixed(2);
  }

  /* eslint-disable camelcase */
  static async storePromotions(promotions = [], passport_id) {
    if (R.isEmpty(promotions)) {
      return;
    }

    for (const promotion_id of promotions) {
      await PassportPromotion.create({ promotion_id, passport_id }).catch((err) => {
        throw new Error(
          `Store passport ${passport_id} promotion ${promotion_id} failed: ${err.message}`,
        );
      });
    }
  }

  static async validate(passport = {}) {
    if (R.isEmpty(passport)) {
      return false;
    }

    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const initial_date = moment(passport.initial_date);

    return initial_date.isSameOrBefore(today) && passport.entries < passport.days;
  }
}

module.exports = PassportService;
