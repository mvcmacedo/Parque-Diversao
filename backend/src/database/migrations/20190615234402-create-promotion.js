module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('promotions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    minimum_days: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    start_day: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    is_active: {
      allowNull: false,
      defaultValue: true,
      type: Sequelize.BOOLEAN,
    },
    percentual: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.FLOAT,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('promotions'),
};
