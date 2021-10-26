const express = require('express')
const passport = require('passport')

// Passport config
require('./config/passport')(passport)

const app = express()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Index Routes
app.get('/', (req, res) => res.send('Node berhasil dibuka pada REST API'))

// Login Routes
const loginRoutes = require('./routes/login')
app.use('/login', loginRoutes)

// Passport-jwt authentication middleware (executed after successful login attempt)
app.use(passport.authenticate('jwt', { session: false }))

// User Routes
const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

// Mata Kuliah Routes
const mataKuliahRoutes = require('./routes/mata-kuliah')
app.use('/user', mataKuliahRoutes)

// Kode Seksi Routes
const kodeSeksiRoutes = require('./routes/kode-seksi')
app.use('/user', kodeSeksiRoutes)

// Semester Routes
const semesterRoutes = require('./routes/semester')
app.use('/user', semesterRoutes)

// Soal Pg Routes
const soalPgRoutes = require('./routes/soal-pg')
app.use('/user', soalPgRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
