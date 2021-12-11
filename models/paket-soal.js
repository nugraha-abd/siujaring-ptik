const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'PaketSoal',
    {
      id_paket: {
        type: Sequelize.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kode_paket: {
        type: Sequelize.CHAR(15),
        unique: true,
        allowNull: false,
      },
      jenis_ujian: {
        type: Sequelize.ENUM('uts', 'uas', 'kuis'),
        allowNull: false,
      },
      tgl_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      waktu_mulai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      durasi_soal: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      durasi_jeda_soal: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      durasi_paket: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      jml_soal: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      jml_soal_siap: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      status_paket: {
        type: Sequelize.ENUM('draf', 'terbit'),
        allowNull: false,
      },
      aktif: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { tableName: 'tb_paket_soal' }
  )
}
