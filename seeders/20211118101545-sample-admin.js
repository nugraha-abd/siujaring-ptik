'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'tb_user',
      [
        {
          username: 'admin',
          password: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tb_user', { role: 'admin' }, {})
  },
}
