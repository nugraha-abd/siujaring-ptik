const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'RelKodeSeksiPaketSoal',
    {
      id_kosek: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      id_paket: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { tableName: 'rel_kode_seksi_paket_soal' }
  )
}
