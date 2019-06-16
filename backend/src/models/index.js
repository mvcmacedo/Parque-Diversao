const Sequelize = require('sequelize');

const config = require('../config/database');

const UserModel = require('./user');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  User: UserModel.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
