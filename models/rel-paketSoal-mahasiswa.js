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
      jawaban_mhs: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      nilai: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
      },
      jawaban_benar: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      jawaban_salah: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      status_ujian: {
        type: Sequelize.ENUM('belum', 'sudah'),
        defaultValue: 'belum',
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      },
    },
    { tableName: 'rel_paket_soal_mahasiswa' }
  )
}
