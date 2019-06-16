module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('passports', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: Sequelize.STRING,
    cost: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    initial_date: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    days: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    entries: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    status: {
      allowNull: false,
      defaultValue: 'Quoted',
      type: Sequelize.STRING,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('passports'),
};
