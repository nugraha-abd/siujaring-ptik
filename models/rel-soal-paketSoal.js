const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'RelSoalPaketSoal',
    {
      id_paket: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      id_soal: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      no_urut_soal: {
        type: Sequelize.INTEGER(2),
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },
    },
    { tableName: 'rel_soal_paket_soal' }
  )
}
