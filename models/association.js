// Function to define association models

function association(sequelize) {
  const {
    User,
    Mahasiswa,
    Dosen,
    MataKuliah,
    KodeSeksi,
    JenisUjian,
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
    as: 'kode_seksi',
    foreignKey: 'id_dosen',
    sourceKey: 'id_user',
  })
  KodeSeksi.belongsTo(Dosen, {
    foreignKey: 'id_dosen1',
    targetKey: 'id_dosen',
  })
  KodeSeksi.belongsTo(Dosen, {
    foreignKey: 'id_dosen2',
    targetKey: 'id_dosen',
  })
  KodeSeksi.belongsTo(Dosen, {
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
    foreignKey: 'id_semester',
    targetKey: 'id_semester',
  })

  // JenisUjian - KodeSeksi [N:1] - ask later
  KodeSeksi.hasMany(JenisUjian, {
    as: 'jenis_ujian',
    foreignKey: 'id_kosek',
    sourceKey: 'id_kosek',
  })
  JenisUjian.belongsTo(KodeSeksi, {
    foreignKey: 'id_kosek',
    targetKey: 'id_kosek',
  })

  // Dosen - SoalPg [N:1]
  Dosen.hasMany(SoalPg, {
    as: 'soal_pg',
    foreignKey: 'id_dosen',
    sourceKey: 'id_dosen',
  })
  SoalPg.belongsTo(Dosen, {
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
    foreignKey: 'id_matkul',
    targetKey: 'id_matkul',
  })

  // JenisUjian - PaketSoal [1:1]
  JenisUjian.hasOne(PaketSoal, {
    as: 'jenis_ujian',
    foreignKey: 'id_jenis_ujian',
    sourceKey: 'id_jenis_ujian',
  })
  PaketSoal.belongsTo(JenisUjian, {
    foreignKey: 'id_jenis_ujian',
    targetKey: 'id_jenis_ujian',
  })

  // KodeSeksi - PaketSoal [1:1]
  KodeSeksi.hasOne(PaketSoal, {
    as: 'kode_seksi',
    foreignKey: 'id_kosek',
    sourceKey: 'id_kosek',
  })
  PaketSoal.belongsTo(KodeSeksi, {
    foreignKey: 'id_kosek',
    targetKey: 'id_kosek',
  })

  // Mahasiswa - PaketSoal [N:M]
  Mahasiswa.belongsToMany(PaketSoal, {
    through: RelPaketSoalMahasiswa,
    foreignKey: 'id_mhs',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(Mahasiswa, {
    through: RelPaketSoalMahasiswa,
    foreignKey: 'id_paket',
    otherKey: 'id_mhs',
  })

  // Mahasiswa - KodeSeksi [N:M]
  Mahasiswa.belongsToMany(KodeSeksi, {
    through: RelKodeSeksiMahasiswa,
    foreignKey: 'id_mhs',
    otherKey: 'id_kosek',
  })
  KodeSeksi.belongsToMany(Mahasiswa, {
    through: RelKodeSeksiMahasiswa,
    foreignKey: 'id_kosek',
    otherKey: 'id_mhs',
  })

  // Soal - PaketSoal [N:M]
  SoalPg.belongsToMany(PaketSoal, {
    through: RelSoalPaketSoal,
    foreignKey: 'id_soal',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(SoalPg, {
    through: RelSoalPaketSoal,
    foreignKey: 'id_paket',
    otherKey: 'id_soal',
  })

  // KodeSeksi - PaketSoal [N:M]
  KodeSeksi.belongsToMany(PaketSoal, {
    through: RelKodeSeksiPaketSoal,
    foreignKey: 'id_kosek',
    otherKey: 'id_paket',
  })
  PaketSoal.belongsToMany(KodeSeksi, {
    through: RelKodeSeksiPaketSoal,
    foreignKey: 'id_paket',
    otherKey: 'id_kosek',
  })
}

module.exports = { association }
