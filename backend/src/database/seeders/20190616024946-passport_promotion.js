const moment = require('moment');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'passport_promotion',
    [
      {
        passport_id: 1,
        promotion_id: 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        passport_id: 1,
        promotion_id: 2,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('passport_promotion', null, {}),
};
