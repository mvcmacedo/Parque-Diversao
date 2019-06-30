const Sequelize = require('sequelize');

class Passport extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        code: DataTypes.STRING,
        cost: DataTypes.FLOAT,
        status: DataTypes.STRING,
        initial_date: DataTypes.DATE,
        days: DataTypes.INTEGER,
        entries: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
      },
      {
        tableName: 'Passports',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.promotions = this.belongsToMany(models.Promotion, {
      as: 'Promotions',
      through: { model: models.PassportPromotion, unique: false },
      foreignKey: 'passport_id',
    });
  }
}

module.exports = Passport;
