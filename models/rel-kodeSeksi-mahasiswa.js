const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'RelKodeSeksiMahasiswa',
    {
      id_kosek: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      id_mhs: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },
    },
    { tableName: 'rel_kode_seksi_mahasiswa' }
  )
}
