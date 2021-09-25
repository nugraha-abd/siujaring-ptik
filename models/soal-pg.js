const Sequelize = require('sequelize')
const db = require('../config/db')
const Dosen = require('./dosen')
const MataKuliah = require('./mata-kuliah')
const Semester = require('./semester')

const SoalPg = db.define('tb_soal_pg', {
  id_soal: {
    type: Sequelize.INTEGER(5),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_dosen: {
    type: Sequelize.INTEGER(4),
    references: {
      model: Dosen,
      key: id_dosen,
    },
  },
  id_matkul: {
    type: Sequelize.INTEGER(2),
    references: {
      model: MataKuliah,
      key: id_matkul,
    },
  },
  id_semester: {
    type: Sequelize.INTEGER(3),
    references: {
      model: Semester,
      key: id_semester,
    },
  },
  soal: {
    type: Sequelize.TEXT,
  },
  gambar_soal: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  jawaban_a: {
    type: Sequelize.TEXT,
  },
  gambar_jawaban_a: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  jawaban_b: {
    type: Sequelize.TEXT,
  },
  gambar_jawaban_b: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  jawaban_c: {
    type: Sequelize.TEXT,
  },
  gambar_jawaban_c: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  jawaban_d: {
    type: Sequelize.TEXT,
  },
  gambar_jawaban_d: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  jawaban_e: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  gambar_jawaban_e: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('draf', 'terbit'),
    allowNull: true,
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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = SoalPg
