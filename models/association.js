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
    foreignKey: 'id_matkul',
    sourceKey: 'id_matkul',
  })
  PaketSoal.belongsTo(JenisUjian, {
    foreignKey: 'id_matkul',
    targetKey: 'id_matkul',
  })

  // KodeSeksi - PaketSoal [1:1]
  KodeSeksi.hasOne(PaketSoal, {
    as: 'kode_seksi',
    foreignKey: 'id_jenis_ujian',
    sourceKey: 'id_jenis_ujian',
  })
  PaketSoal.belongsTo(KodeSeksi, {
    foreignKey: 'id_jenis_ujian',
    targetKey: 'id_jenis_ujian',
  })

  // Mahasiswa - PaketSoal [N:M]
  Mahasiswa.belongsToMany(PaketSoal, {
    through: 'RelPaketSoalMahasiswa',
    sourceKey: 'id_mhs',
    targetKey: 'id_mhs',
  })
  PaketSoal.belongsToMany(Mahasiswa, {
    through: 'RelPaketSoalMahasiswa',
    sourceKey: 'id_paket',
    targetKey: 'id_paket',
  })

  // Mahasiswa - KodeSeksi [N:M]
  Mahasiswa.belongsToMany(KodeSeksi, {
    through: 'RelKodeSeksiMahasiswa',
    sourceKey: 'id_mhs',
    targetKey: 'id_mhs',
  })
  KodeSeksi.belongsToMany(Mahasiswa, {
    through: 'RelKodeSeksiMahasiswa',
    sourceKey: 'id_kosek',
    targetKey: 'id_kosek',
  })

  // Soal - PaketSoal [N:M]
  Soal.belongsToMany(PaketSoal, {
    through: 'RelSoalPaketSoal',
    sourceKey: 'id_soal',
    targetKey: 'id_soal',
  })
  PaketSoal.belongsToMany(Soal, {
    through: 'RelSoalPaketSoal',
    sourceKey: 'id_paket',
    targetKey: 'id_paket',
  })

  // KodeSeksi - PaketSoal [N:M]
  KodeSeksi.belongsToMany(PaketSoal, {
    through: 'RelKodeSeksiPaketSoal',
    sourceKey: 'id_kosek',
    targetKey: 'id_kosek',
  })
  PaketSoal.belongsToMany(KodeSeksi, {
    through: 'RelKodeSeksiPaketSoal',
    sourceKey: 'id_paket',
    targetKey: 'id_paket',
  })
}

module.exports = { association }
