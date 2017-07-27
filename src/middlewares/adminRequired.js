const adminRequired = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
    return
  }
  res.sendStatus(401)
}

export default adminRequired