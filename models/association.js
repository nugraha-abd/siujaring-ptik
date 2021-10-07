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
    as: 'mata-kuliah',
    foreignKey: 'id_matkul',
    sourceKey: 'id_matkul',
  })
  KodeSeksi.belongsTo(MataKuliah, {
    foreignKey: 'id_matkul',
    targetKey: 'id_matkul',
  })

  // Semester - KodeSeksi [N:1]
  Semester.hasMany(KodeSeksi, {
    as: 'semester',
    foreignKey: 'id_semester',
    sourceKey: 'id_semester',
  })
  KodeSeksi.belongsTo(Semester, {
    foreignKey: 'id_semester',
    targetKey: 'id_semester',
  })
}

module.exports = { association }
