module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('entries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    passport_id: {
      type: Sequelize.INTEGER,
      references: { model: 'passports', key: 'id' },
      allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('entries'),
};
