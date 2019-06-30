const Sequelize = require('sequelize');

class Entries extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        date: DataTypes.DATE,
        passport_id: DataTypes.INTEGER,
      },
      {
        tableName: 'Entries',
        sequelize,
      },
    );
  }
}

module.exports = Entries;
