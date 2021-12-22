const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'User',
    {
      id_user: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        defaultValue: null, // might remove it later
      },
      username: {
        type: Sequelize.STRING(18),
        unique: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('dosen', 'mahasiswa', 'admin'),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      keterangan: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        allowNull: false,
      },
    },
    { tableName: 'tb_user' }
  )
}
