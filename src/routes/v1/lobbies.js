import express from 'express'
import _ from 'lodash'

import { LOBBY, LOBBIES, LOBBY_START, LOBBY_END } from '../routes'
import setItem from '../../middlewares/setItem'
import db from '../../models'

const router = express.Router()
const LobbyModel = db['Lobby']

export const show = (req, res) => {
  const lobby = req.item
  res.json(lobby)
}

// export const update = (req, res) => {
//   const lobby = req.item
//   if (req.item.peerId1 === null) {
//     const peerId1 = req.body.peerId
//     const editorState = req.body.editorState || lobby.editorState
//     lobby
//       .update({ peerId1, editorState }, {where: {}})
//       .then(res.json.bind(res))
//   } else if (req.item.peerId2 === null) {
//     const peerId2 = req.body.peerId
//     const editorState = req.body.editorState || lobby.editorState
//     lobby
//       .update({ peerId2, editorState })
//       .then(res.json.bind(res))
//   } else {
//
//   }
// }

export const update = (req, res) => {
  const lobby = req.item
  const peerId = req.body.peerId
  const editorState = req.body.editorState || lobby.editorState

  lobby
    .update({ peerId, editorState })
    .then(res.json.bind(res))
}

export const start = (req, res) => {
  const lobby = req.item
  lobby
    .update({ timeStart: Date.now() })
    .then(res.json.bind(res))
}

export const end = (req, res) => {
  const lobby = req.item
  lobby
    .update({ timeEnd: Date.now() })
    .then(res.json.bind(res))
}

export const create = (req, res, next) => {
  LobbyModel
    .create()
    .then(res.json.bind(res))
}

const setItemConfig = {
  modelName: 'Lobby',
  fieldName: 'url',
  type: String
}

router.get(LOBBY, setItem(setItemConfig), show)

router.put(LOBBY, setItem(setItemConfig), update)

router.put(LOBBY_START, setItem(setItemConfig), start)

router.put(LOBBY_END, setItem(setItemConfig), end)

router.post(LOBBIES, create)

export default router
