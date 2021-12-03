'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'ref_kode_seksi',
      [
        {
          id_matkul: 1,
          id_dosen1: 1,
          id_semester: 1,
          nomor_kosek: '15063501',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 1,
          id_dosen1: 1,
          id_dosen2: 7,
          id_semester: 1,
          nomor_kosek: '15063502',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 1,
          id_dosen1: 2,
          id_semester: 1,
          nomor_kosek: '15063503',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 2,
          id_dosen1: 6,
          id_dosen2: 4,
          id_semester: 1,
          nomor_kosek: '15063701',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 2,
          id_dosen1: 6,
          id_dosen2: 4,
          id_semester: 1,
          nomor_kosek: '15063702',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 2,
          id_dosen1: 2,
          id_semester: 1,
          nomor_kosek: '15063703',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 3,
          id_dosen1: 7,
          id_semester: 1,
          nomor_kosek: '15062501',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 3,
          id_dosen1: 7,
          id_semester: 1,
          nomor_kosek: '15062502',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 3,
          id_dosen1: 2,
          id_dosen2: 5,
          id_dosen3: 4,
          id_semester: 1,
          nomor_kosek: '15062503',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 1,
          id_dosen1: 2,
          id_semester: 2,
          nomor_kosek: '16064801',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_matkul: 3,
          id_dosen1: 1,
          id_semester: 3,
          nomor_kosek: '17060901',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('ref_kode_seksi', null, {})
  },
}
