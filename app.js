import {} from 'dotenv/config'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import enableCors from './middlewares/enableCors'
import githubAuthentication from './routes/authentication'
import v1 from './routes/v1'
import { PORT } from './config'

const app = express()

app.use(bodyParser.json())
app.use(enableCors)
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "SHHHHHHH",
}))

app.use('/auth', githubAuthentication)
app.use('/v1', ...v1)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(500)
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
