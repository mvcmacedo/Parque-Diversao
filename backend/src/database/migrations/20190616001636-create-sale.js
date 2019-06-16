module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    amount: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.FLOAT,
    },
    passport_id: {
      type: Sequelize.INTEGER,
      references: { model: 'passports', key: 'id' },
      allowNull: false,
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    is_confirmed: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('sales'),
};
