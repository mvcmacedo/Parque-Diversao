/* eslint-disable camelcase */
const R = require('ramda');
const moment = require('moment');
const { Random } = require('random-js');

const { Error, response } = require('../helpers');

const { Sale, Entries } = require('../models');
const { PassportService, UserService } = require('../services');

const random = new Random();

class PassportController {
  /* eslint-disable no-underscore-dangle */
  static async list(req, res) {
    try {
      const userIdFilter = !req.user.is_admin ? { user_id: req.user.id } : {};

      const pick = ['order'];
      const __filters__ = R.pick(pick, req.query);

      const filters = { ...userIdFilter, ...__filters__ };

      const passports = await PassportService.get(filters);

      return response(res, 200, null, passports);
    } catch (err) {
      return response(res, 500, err);
    }
  }

  static async budget(req, res) {
    try {
      const pick = ['initial_date', 'days', 'promotions'];
      const data = R.pick(pick, req.body);

      const { email } = req.body;

      const [user] = await UserService.get({ email });

      if (!user) {
        throw new Error('User not Found', 404);
      }

      const cost = await PassportService.applyPromotions(data).catch(() => {
        throw new Error('Failed to apply promotions');
      });

      const passport = {
        ...data,
        cost,
        user_id: user.id,
      };

      const budget = await PassportService.create(passport);

      await PassportService.storePromotions(data.promotions, budget.id);

      return response(res, 200, null, budget);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }

  static async buy(req, res) {
    try {
      const pick = ['id'];
      const filters = R.pick(pick, req.params);

      const [{
        cost: amount, id, user_id, status,
      }] = await PassportService.get(filters).catch(
        () => {
          throw new Error('Passport not found', 404);
        },
      );

      if (req.user.id !== user_id) {
        throw new Error('User not allowed to buy this passport', 401);
      }

      if (status === 'Sold') {
        throw new Error('Passport already bought', 404);
      }

      const buy = {
        status: 'Sold',
        code: random.string(20),
      };

      await PassportService.update(buy, filters).catch(() => {
        throw new Error('Passport purchase failed');
      });

      await Sale.create({
        amount,
        passport_id: id,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      const [updatedPassport] = await PassportService.get(filters);

      return response(res, 200, null, updatedPassport);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }

  static async validate(req, res) {
    try {
      const { code } = req.body;

      const [passport] = await PassportService.get({ code, status: 'Sold' });

      if (!passport) {
        throw new Error('Invalid passport code', 401);
      }

      const isValid = await PassportService.validate(passport);

      if (isValid) {
        await PassportService.update({ entries: passport.entries + 1 }, { code }).catch(() => {
          throw new Error('Register passport entry failed');
        });

        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        await Entries.create({
          passport_id: passport.id,
          date,
        }).catch(async () => {
          await PassportService.update({ entries: passport.entries - 1 }, { code });

          throw new Error('Register entry failed');
        });
      }

      return response(res, 200, null, isValid);
    } catch (err) {
      const status = err.http_code || 500;

      return response(res, status, err);
    }
  }
}

module.exports = PassportController;
