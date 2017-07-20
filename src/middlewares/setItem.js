import db from '../models'

const setItem = ({
  modelName,
  fieldName = 'id',
  type = Number,
  fieldStorage = 'req.params'
}) => {
  return (req, res, next) => {
    try {
      const field = type(req.params.id)

      db[modelName]
        .findOne({
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
