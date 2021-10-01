const Sequelize = require('sequelize')

const db = new Sequelize('siujaring', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    freezeTableName: true,
    underscored: true,
    raw: true,
    plain: true,
    timestamps: false,
  },
})

// DB authentication
db.authenticate()
  .then(() => {
    console.log('Berhasil terkoneksi ke database.')
  })
  .catch((err) => {
    console.error('Tidak dapat terhubung ke database:', err)
  })

module.exports = db
