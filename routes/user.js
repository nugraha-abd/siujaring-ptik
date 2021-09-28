const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

// NOTES:
// For now focus on the register and login routes
router
  .route('/')
  // .get((req, res) => {
  //   console.log(req.user)
  //   res.send(`Get User With ID ${req.params.id}`)
  // })
  .post(userController.post)
// .put((req, res) => {
//   res.send(`Update User With ID ${req.params.id}`)
// })
// .delete((req, res) => {
//   res.send(`Delete User With ID ${req.params.id}`)
// })

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

module.exports = router
