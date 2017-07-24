const authRequired = (req, res, next) => {
  if (req.user) {
    next()
    return
  }
  res.sendStatus(401)
}

export default authRequired