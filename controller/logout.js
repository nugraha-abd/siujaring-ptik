module.exports = {
  logout: async (req, res) => {
    try {
      req.logout()
      res.status(200).json({
        message: 'Berhasil Logout',
        success: true,
      })
    } catch {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
