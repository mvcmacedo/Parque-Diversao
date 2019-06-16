const Sequelize = require('sequelize');

const config = require('../config/database');

const UserModel = require('./user');
const SaleModel = require('./sale');
const EntriesModel = require('./entries');
const PassportModel = require('./passport');
const PromotionModel = require('./promotion');
const PassportPromotionModel = require('./passport_promotion');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  User: UserModel.init(sequelize, Sequelize),
  Passport: PassportModel.init(sequelize, Sequelize),
  Promotion: PromotionModel.init(sequelize, Sequelize),
  Sale: SaleModel.init(sequelize, Sequelize),
  Entries: EntriesModel.init(sequelize, Sequelize),
  PassportPromotion: PassportPromotionModel.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
