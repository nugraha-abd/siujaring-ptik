const express = require('express')
const router = express.Router()

const loginController = require('../controller/login')

// router
//   .route('/:id')
//   .get((req, res) => {
//     console.log(req.user)
//     res.send(`Get User With ID ${req.params.id}`)
//   })
//   .put((req, res) => {
//     res.send(`Update User With ID ${req.params.id}`)
//   })
//   .delete((req, res) => {
//     res.send(`Delete User With ID ${req.params.id}`)
//   })

router.post('/', loginController.login)

module.exports = router
