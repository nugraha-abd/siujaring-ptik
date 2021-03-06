// Function to define association models

function association(sequelize) {
  const {
    User,
    Mahasiswa,
    Dosen,
    MataKuliah,
    KodeSeksi,
    Semester,
    SoalPg,
    PaketSoal,
    RelKodeSeksiPaketSoal,
    RelKodeSeksiMahasiswa,
    RelSoalPaketSoal,
    RelPaketSoalMahasiswa,
  } = sequelize.models

  // User - Mahasiswa [1:1]
  User.hasOne(Mahasiswa, {
    as: 'mahasiswa',
    foreignKey: 'id_user',
    sourceKey: 'id_user',
  })
  Mahasiswa.belongsTo(User, {
    foreignKey: 'id_user',
    targetKey: 'id_user',
  })

  // User - Dosen [1:1]
  User.hasOne(Dosen, {
    as: 'dosen',
    foreignKey: 'id_user',
    sourceKey: 'id_user',
  })
  Dosen.belongsTo(User, {
    foreignKey: 'id_user',
    targetKey: 'id_user',
  })

  // Dosen - KodeSeksi [N:1]
  Dosen.hasMany(KodeSeksi, {
    foreignKey: 'id_dosen1',
    sourceKey: 'id_dosen',
  })
  KodeSeksi.belongsTo(Dosen, {
    as: 'dosen1',
    foreignKey: 'id_dosen1',
    targetKey: 'id_dosen',
  })
  Dosen.hasMany(KodeSeksi, {
    foreignKey: 'id_dosen2',
    sourceKey: 'id_dosen',
  })
  KodeSeksi.belongsTo(Dosen, {
    as: 'dosen2',
    foreignKey: 'id_dosen2',
    targetKey: 'id_dosen',
  })
  Dosen.hasMany(KodeSeksi, {
    foreignKey: 'id_dosen3',
    sourceKey: 'id_dosen',
  })
  KodeSeksi.belongsTo(Dosen, {
    as: 'dosen3',
    foreignKey: 'id_dosen3',
    targetKey: 'id_dosen',
  })

  // MataKuliah - KodeSeksi [N:1]
  MataKuliah.hasMany(KodeSeksi, {
    as: 'kode_seksi',
    foreignKey: 'id_matkul',
    sourceKey: 'id_matkul',
  })
  KodeSeksi.belongsTo(MataKuliah, {
    as: 'mata_kuliah',
    foreignKey: 'id_matkul',
    targetKey: 'id_matkul',
  })

  // Semester - KodeSeksi [N:1]
  Semester.hasMany(KodeSeksi, {
    as: 'kode_seksi',
    foreignKey: 'id_semester',
    sourceKey: 'id_semester',
  })
  KodeSeksi.belongsTo(Semester, {
    as: 'semester',
    foreignKey: 'id_semester',
    targetKey: 'id_semester',
  })

  // Dosen - SoalPg [N:1]
  Dosen.hasMany(SoalPg, {
    as: 'soal_pg',
    foreignKey: 'id_dosen',
    sourceKey: 'id_dosen',
  })
  SoalPg.belongsTo(Dosen, {
    as: 'dosen',
    foreignKey: 'id_dosen',
    targetKey: 'id_dosen',
  })

  // MataKuliah - SoalPg [1:1]
  MataKuliah.hasOne(SoalPg, {
    as: 'soal_pg',
    foreignKey: 'id_matkul',
    sourceKey: 'id_matkul',
  })
  SoalPg.belongsTo(MataKuliah, {
    as: 'mata_kuliah',
    foreignKey: 'id_matkul',
    targetKey: 'id_matkul',
  })

  // Semester - SoalPg [1:1]
  Semester.hasOne(SoalPg, {
    as: 'soal_pg',
    foreignKey: 'id_semester',
    sourceKey: 'id_semester',
  })
  SoalPg.belongsTo(Semester, {
    as: 'semester',
    foreignKey: 'id_semester',
    targetKey: 'id_semester',
  })

  // Mahasiswa - PaketSoal [N:M]
  Mahasiswa.belongsToMany(PaketSoal, {
    as: 'paket_soal',
    through: RelPaketSoalMahasiswa,
    foreignKey: 'id_mhs',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(Mahasiswa, {
    as: 'mahasiswa',
    through: RelPaketSoalMahasiswa,
    foreignKey: 'id_paket',
    otherKey: 'id_mhs',
  })

  // Mahasiswa - KodeSeksi [N:M]
  Mahasiswa.belongsToMany(KodeSeksi, {
    as: 'kode_seksi',
    through: RelKodeSeksiMahasiswa,
    foreignKey: 'id_mhs',
    otherKey: 'id_kosek',
  })
  KodeSeksi.belongsToMany(Mahasiswa, {
    as: 'mahasiswa',
    through: RelKodeSeksiMahasiswa,
    foreignKey: 'id_kosek',
    otherKey: 'id_mhs',
  })

  // Soal - PaketSoal [N:M]
  SoalPg.belongsToMany(PaketSoal, {
    as: 'paket_soal',
    through: RelSoalPaketSoal,
    foreignKey: 'id_soal',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(SoalPg, {
    as: 'soal_pg',
    through: RelSoalPaketSoal,
    foreignKey: 'id_paket',
    otherKey: 'id_soal',
  })

  // KodeSeksi - PaketSoal [N:M]
  KodeSeksi.belongsToMany(PaketSoal, {
    as: 'paket_soal',
    through: RelKodeSeksiPaketSoal,
    foreignKey: 'id_kosek',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(KodeSeksi, {
    as: 'kode_seksi',
    through: RelKodeSeksiPaketSoal,
    foreignKey: 'id_paket',
    otherKey: 'id_kosek',
  })
}

module.exports = { association }
