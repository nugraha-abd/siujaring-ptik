'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin', 10)

    return await queryInterface.bulkInsert(
      'tb_user',
      [
        {
          username: 'admin',
          password: hashedPassword,
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
