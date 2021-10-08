const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'RelPaketSoalMahasiswa',
    {
      id_paket: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      id_mhs: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      nilai: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
      },
      no_urut_soal: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      no_urut_soal: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { tableName: 'rel_paket_soal_mahasiswa' }
  )
}
