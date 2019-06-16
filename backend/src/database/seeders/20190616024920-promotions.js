const moment = require('moment');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'promotions',
    [
      {
        name: 'Student',
        minimum_days: 5,
        start_day: 2,
        is_active: true,
        percentual: 10,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'PagueBem',
        minimum_days: 0,
        start_day: 0,
        is_active: true,
        percentual: 2,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'Olders',
        minimum_days: 4,
        start_day: 3,
        is_active: true,
        percentual: 15,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'SeguroGarantido',
        minimum_days: 0,
        start_day: 7,
        is_active: true,
        percentual: 2,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('promotions', null, {}),
};
