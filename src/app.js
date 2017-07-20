import {} from 'dotenv/config'
import http from 'http'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { ExpressPeerServer } from 'peer'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import enableCors from './middlewares/enableCors'
import githubAuthentication from './routes/authentication'
import v1 from './routes/v1'
import { PORT, SECRET_KEY } from './config'
import { connectPeer, disconnectPeer } from './utils/peerUtils'

const app = express()
const server = http.createServer(app)
const peerServer = ExpressPeerServer(server, { debug: true })

app.use(bodyParser.json())
app.use(enableCors)
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use(session({ resave: false, saveUninitialized: false, secret: SECRET_KEY }))

app.use('/auth', githubAuthentication)
app.use('/v1', ...v1)
app.use('/peerjs', peerServer)

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(500)
})

server.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})

peerServer.on('connection', connectPeer)
peerServer.on('disconnect', disconnectPeer)
