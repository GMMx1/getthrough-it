import db from '../models'

const setItem = ({
  modelName,
  fieldName = 'id',
  type = Number,
  fieldStorage = 'req.item'
}) => {
  return (req, res, next) => {
    try {
      // second middleware id is on req.item
      const field = type(req.item.id)

      db[modelName]
        .findAll({
          where: {
            [fieldName]: field
          }
        })
        .then(item => {
          if (item) {
            req.item = item
            next()
          } else {
            res.sendStatus(404)
          }
        })
    } catch (e) {
      next(e)
    }
  }
}

export default setItem
