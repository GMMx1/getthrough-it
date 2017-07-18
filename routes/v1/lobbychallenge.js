import express from 'express'
import _ from 'lodash'

import { LOBBY_CHALLENGES } from '../routes'
import setItem from '../../middlewares/setItem'
import setItems from '../../middlewares/setItems'
// import setItems from '../../middlewares/setItems'
import db from '../../models'

const router = express.Router()

export const show = (req, res) => {
  const lobby = req.item
  res.json(lobby)
}

export const create = (req, res) => {
  console.log('req.body: ', req.body)
  db['LobbyChallenges']
    .create({ lobbyId: req.item.id, challengeId: req.body.challengeId, editorState: req.body.editorState, createdAt: Date.now(), updatedAt: Date.now() } )
    .then(res.json.bind(res))
}

export const update = (req, res) => {
  try {
    db['Lobby']
    .findOne({
      where: {
        url: req.params.id
      }
    })
    .then(lobby => {
      return db['LobbyChallenges']
      .findOne({
        where: {
          lobbyId: lobby.id,
          challengeId: req.body.challengeId
        }
      })
    })
    .then(item => {
      if (item) {
        const complete = req.body.complete;
        const editorState = req.body.editorState;
        const duration = req.body.duration;
        const updatedAt = Date.now()
        return item.update( { complete, editorState, duration, updatedAt } )
      } else {
        res.sendStatus(404)
      }
    })
    .then(res.json.bind(res))
    .catch(e => {
      console.log('error in promise chain', e)
    })
  } catch(e) {
    console.log('error in try catch: ', e)
  }
}

const setItemConfig = {
  modelName: 'Lobby',
  fieldName: 'url',
  type: String
}

router.get(LOBBY_CHALLENGES, setItem(setItemConfig), setItems({modelName: 'LobbyChallenges', fieldName: 'lobbyId' }), show)

router.post(LOBBY_CHALLENGES, setItem(setItemConfig), create)

router.put(LOBBY_CHALLENGES, update)



export default router
