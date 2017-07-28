import express from 'express'
import _ from 'lodash'

import { USER_LOBBIES } from '../routes'
import db from '../../models'
import authRequired from '../../middlewares/authRequired'

const router = express.Router()
const Lobby = db['Lobby']
const UserLobbies = db['UserLobbies']

export const show = (req, res) => {
  const userId = Number(req.params.id)

  if (req.user.id !== userId) {
    return res.sendStatus(401)
  }

  UserLobbies.findAll({
    where: { userId }
  }).then((userLobbies) => {
      return Lobby.findAll({
        where: {
          url: { $in: userLobbies.map(ul => ul.lobbyUrl) }
        }
      })
    })
    .then((lobbies) => {
      res.json(lobbies)
    })
    .catch((error) => {
      console.error(error)
      res.sendStatus(400)
    })
}

export const update = (req, res) => {
  const userId = Number(req.params.id)
  const lobbyUrl = req.body.lobbyUrl

  if (req.user.id !== userId) {
    return res.sendStatus(401)
  }

  // TODO: Secure lobby
  UserLobbies
    .findOrCreate({ 
      where: {
        userId,
        lobbyUrl
      }
    })
    .then(([model, created]) => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error(error)
      res.sendStatus(400)
    })
}

router.get(USER_LOBBIES, authRequired, show)

router.put(USER_LOBBIES, authRequired, update)

export default router
