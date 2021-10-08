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

// Passport-jwt authentication middleware (executed after successful login)
app.use(passport.authenticate('jwt', { session: false }))

// User routes
const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
