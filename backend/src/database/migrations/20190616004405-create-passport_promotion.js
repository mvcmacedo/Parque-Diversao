module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('passport_promotion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    passport_id: {
      type: Sequelize.INTEGER,
      references: { model: 'passports', key: 'id' },
      allowNull: false,
    },
    promotion_id: {
      type: Sequelize.INTEGER,
      references: { model: 'promotions', key: 'id' },
      allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('passport_promotion'),
};
