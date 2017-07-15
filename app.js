import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import enableCors from './middlewares/enableCors'
import v1 from './routes/v1'
import { PORT } from './config'

const app = express()

app.use(bodyParser.json())
app.use(enableCors)

app.use(morgan('dev'))

app.use('/v1', ...v1)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(500)
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
