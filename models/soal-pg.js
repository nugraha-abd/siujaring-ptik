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
        allowNull: false,
      },
      id_matkul: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
      },
      id_semester: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
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
      status_soal: {
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
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      },
      updated_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
      },
    },
    { tableName: 'tb_soal_pg' }
  )
}
