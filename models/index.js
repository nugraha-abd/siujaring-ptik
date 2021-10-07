const sequelize = require('../config/db')
const { association } = require('./association')

const modelDefiners = [
  require('./user'),
  require('./dosen'),
  require('./mahasiswa'),
  require('./mata-kuliah'),
  require('./kode-seksi'),
  require('./jenis-ujian'),
  require('./semester'),
  require('./soal-pg'),
  require('./paket-soal'),
  require('./rel-kodeSeksi-paketSoal'),
  require('./rel-kodeSeksi-mahasiswa'),
  require('./rel-soal-paketSoal'),
  require('./rel-paketSoal-mahasiswa'),
]

// Define all models according to their files
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// Execute any extra setup after the models are defined, such as adding associations
association(sequelize)

module.exports = sequelize
