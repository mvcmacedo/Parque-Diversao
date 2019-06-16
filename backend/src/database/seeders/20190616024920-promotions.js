const moment = require('moment');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'promotions',
    [
      {
        name: 'Promotion01',
        minimum_days: 0,
        start_day: 0,
        is_active: false,
        percentual: 5,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'Promotion02',
        minimum_days: 0,
        start_day: 0,
        is_active: false,
        percentual: 4,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('promotions', null, {}),
};
