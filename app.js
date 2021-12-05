const express = require('express')
const passport = require('passport')

// Passport config
require('./config/passport')(passport)

const app = express()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Public Folder
app.use(express.static('./public'))

// Index Routes
app.get('/', (req, res) => res.send('Node berhasil dibuka pada REST API'))

// Auth Routes
const authRoutes = require('./routes/auth')
app.use('/', authRoutes)

// Passport-jwt authentication middleware (executed after successful login attempt)
app.use(passport.authenticate('jwt', { session: false }))

// User Routes
const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

// Mata Kuliah Routes
const mataKuliahRoutes = require('./routes/mata-kuliah')
app.use('/mata-kuliah', mataKuliahRoutes)

// Kode Seksi Routes
const kodeSeksiRoutes = require('./routes/kode-seksi')
app.use('/kode-seksi', kodeSeksiRoutes)

// Semester Routes
const semesterRoutes = require('./routes/semester')
app.use('/semester', semesterRoutes)

// Soal Pg Routes
const soalPgRoutes = require('./routes/soal-pg')
app.use('/soal-pg', soalPgRoutes)

// Soal Pg Routes
const paketSoalRoutes = require('./routes/paket-soal')
app.use('/soal-pg', paketSoalRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
