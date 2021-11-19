'use strict'

const bcrypt = require('bcrypt')

// import user model from index model
const { models } = require('../models/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('mahasiswa', 10)

    const dataUserMahasiswa = []
    const dataMahasiswa = []

    for (let i = 1; i <= 20; i++) {
      // convert 1 to 01, 2 to 02, ...
      let pad = i < 10 ? '0' + i : i

      dataUserMahasiswa.push({
        username: `1000${pad}`,
        password: hashedPassword,
        role: 'mahasiswa',
        email: `mahasiswa${pad}@mahasiswa.com`,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // insert into table user
    const userMahasiswa = await models.User.bulkCreate(dataUserMahasiswa)

    for (let i = 1; i <= 20; i++) {
      // convert 1 to 01, 2 to 02, ...
      let pad = i < 10 ? '0' + i : i

      dataMahasiswa.push({
        id_user: userMahasiswa[i - 1].id_user,
        nama_mhs: `Mahasiswa ${pad}`,
        nim: `1000${pad}`,
        no_telpon: `081200000${pad}`,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // insert into table mahasiswa
    return await queryInterface.bulkInsert('tb_mahasiswa', dataMahasiswa, {})
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tb_user', { role: 'dosen' }, {})
  },
}
