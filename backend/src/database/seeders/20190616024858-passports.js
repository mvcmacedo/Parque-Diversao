const moment = require('moment');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'passports',
    [
      {
        code: '324234234',
        cost: 100,
        initial_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        days: 5,
        entries: 0,
        user_id: 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('passports', null, {}),
};
