const express = require('express')

require('dotenv').config()

const app = express()

// Import middleware
const authenticateToken = require('./middleware/authenticate-token')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Index Routes
app.get('/', (req, res) => res.send('Node berhasil dibuka pada REST API'))

// Login Routes
const loginRoutes = require('./routes/login')
app.use('/login', loginRoutes)

// Token authentication middleware for every routes
//app.use(passport.authenticate())

// Use the routes
const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
