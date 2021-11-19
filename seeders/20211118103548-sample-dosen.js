'use strict'

// import user model from index model
const { models } = require('../models/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataUserDosen = []
    const dataDosen = []

    const namaDosen = [
      'Yanto',
      'Akang',
      'Tatang',
      'Mamang',
      'Agan',
      'Wawan',
      'Masaji',
    ]

    for (let i = 1; i <= 7; i++) {
      // convert 1 to 01, 2 to 02, ...
      let pad = i < 10 ? '0' + i : i

      dataUserDosen.push({
        username: `2000${pad}`,
        password: 'dosen',
        role: 'dosen',
        email: `dosen${pad}@dosen.com`,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // insert into table user
    const userDosen = await models.User.bulkCreate(dataUserDosen)

    for (let i = 1; i <= 7; i++) {
      // convert 1 to 01, 2 to 02, ...
      let pad = i < 10 ? '0' + i : i

      dataDosen.push({
        id_user: userDosen[i - 1].id_user,
        nama_dosen: namaDosen[i - 1],
        nip: `1495700030${pad}`,
        nidk: `19600${pad}`,
        nidn: `14700${pad}`,
        no_telpon: `081900000${pad}`,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // insert into table dosen
    return await queryInterface.bulkInsert('tb_dosen', dataDosen, {})
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tb_user', { role: 'dosen' }, {})
  },
}
