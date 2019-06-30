const Sequelize = require('sequelize');

class Sale extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        amount: DataTypes.FLOAT,
        date: DataTypes.DATE,
        passport_id: DataTypes.INTEGER,
      },
      {
        tableName: 'Sales',
        sequelize,
      },
    );
  }
}

module.exports = Sale;
