const Sequelize = require('sequelize');

class Promotion extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        minimum_days: DataTypes.INTEGER,
        start_day: DataTypes.DATE,
        is_active: DataTypes.BOOLEAN,
        percentual: DataTypes.FLOAT,
      },
      {
        tableName: 'Promotions',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.passports = this.belongsToMany(models.Passport, {
      as: 'Passports',
      through: { model: models.PassportPromotion, unique: false },
      foreignKey: 'promotion_id',
    });
  }
}

module.exports = Promotion;
