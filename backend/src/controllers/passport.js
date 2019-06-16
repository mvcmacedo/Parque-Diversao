/* eslint-disable camelcase */
const R = require('ramda');

const { PassportService } = require('../services');

class PassportController {
  static async get(req, res) {
    res.status(200);
  }

  static async budget(req, res) {
    try {
      const pick = ['initial_date', 'days', 'promotions'];
      const data = R.pick(pick, req.body);

      const { id: user_id } = req.user;

      const cost = await PassportService.applyPromotions(data);

      const passport = {
        ...data,
        user_id,
        cost,
      };

      const budget = await PassportService.create(passport);

      res.status(200).json(budget);
    } catch (error) {
      res.sendStatus(500).json({ error });
    }
  }

  static async buy(req, res) {}
}

module.exports = PassportController;
