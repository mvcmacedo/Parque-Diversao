const Sequelize = require('sequelize');

class PromotionPassport extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        promotion_id: DataTypes.INTEGER,
        passport_id: DataTypes.INTEGER,
      },
      {
        tableName: 'Passport_Promotion',
        sequelize,
      },
    );
  }
}

module.exports = PromotionPassport;
