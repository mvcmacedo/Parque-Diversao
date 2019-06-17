const Sequelize = require('sequelize');

const { Entries } = require('../models');
const { Error } = require('../helpers');

const { Op } = Sequelize;

class EntriesService {
  static async get(filters = {}) {
    const filter = {};
    const where = {};
    const group = [];
    const attributes = [];

    if (filters.after) {
      where.date = {
        [Op.gte]: filters.after,
      };
    }

    if (filters.before) {
      where.date = {
        [Op.lte]: filters.before,
      };
    }

    if (filters.day) {
      where.date = {
        [Op.between]: [`${filters.day} 00:00:00`, `${filters.day} 23:59:00`],
      };
    }

    if (filters.month) {
      where.date = {
        [Op.between]: [`${filters.month}-01`, `${filters.month}-30`],
      };
    }

    filter.where = where;

    if (filters.groupBy) {
      if (filters.groupBy === 'day') {
        group.push([Sequelize.fn('DAY', Sequelize.col('date'))]);
        attributes.push(
          [Sequelize.fn('DAY', Sequelize.col('date')), 'day'],
          [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
        );
      }

      if (filters.groupBy === 'month') {
        group.push([Sequelize.fn('MONTH', Sequelize.col('date'))]);
        attributes.push(
          [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
        );
      }

      attributes.push([Sequelize.fn('count', Sequelize.col('id')), 'entries']);

      filter.group = group;
      filter.attributes = attributes;
    }

    const entries = await Entries.findAll(filter).catch((err) => {
      throw new Error(`Find entries failed: ${err.message}`);
    });

    return entries;
  }
}

module.exports = EntriesService;
