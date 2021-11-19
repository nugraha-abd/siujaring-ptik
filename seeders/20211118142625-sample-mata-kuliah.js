'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'ref_mata_kuliah',
      [
        {
          kode_matkul: '15023001',
          nama_matkul: 'Pemrograman Web',
          sks: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          kode_matkul: '15023002',
          nama_matkul: 'Data Mining',
          sks: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          kode_matkul: '15023003',
          nama_matkul: 'Struktur Data',
          sks: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('ref_mata_kuliah', null, {})
  },
}
