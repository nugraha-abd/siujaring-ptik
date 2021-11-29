const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'SoalPg',
    {
      id_soal: {
        type: Sequelize.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_dosen: {
        type: Sequelize.INTEGER(4),
      },
      id_matkul: {
        type: Sequelize.INTEGER(2),
      },
      id_semester: {
        type: Sequelize.INTEGER(3),
      },
      soal: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar_soal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_a: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar_jawaban_a: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_b: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar_jawaban_b: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_c: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar_jawaban_c: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_d: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar_jawaban_d: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_e: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gambar_jawaban_e: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      kunci_jawaban: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('draf', 'terbit'),
        allowNull: false,
      },
      jml_digunakan: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
        defaultValue: 0,
      },
      jml_menjawab_benar: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
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
    { tableName: 'tb_soal_pg' }
  )
}
