'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'ref_semester',
      [
        {
          semester: '115',
          created_at: new Date(),
        },
        {
          semester: '116',
          created_at: new Date(),
        },
        {
          semester: '117',
          created_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('ref_semester', null, {})
  },
}
