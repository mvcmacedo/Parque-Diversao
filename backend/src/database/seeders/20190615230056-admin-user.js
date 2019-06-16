const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'Jian Yang',
        email: 'mr.jian@piedpiper.com',
        age: 50,
        password_hash: await bcrypt.hash('thisisyourmom', 8),
        is_admin: true,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'Bertram Gilfoyle',
        email: 'gilfoyle@piedpiper.com',
        age: 30,
        password_hash: await bcrypt.hash('satanrules', 8),
        is_admin: false,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: 'Gavin Belson',
        email: 'gavinb@hooli.com',
        age: 66,
        password_hash: await bcrypt.hash('motherfucker', 8),
        is_admin: false,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
