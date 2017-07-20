import express from 'express'
import _ from 'lodash'

import { LOBBY_CHALLENGES } from '../routes'
import setItem from '../../middlewares/setItem'
import setItems from '../../middlewares/setItems'
// import setItems from '../../middlewares/setItems'
import db from '../../models'

const router = express.Router()

// export const show = (req, res) => {
//   const lobby = req.item
//   res.json(lobby)
// }

export const create = (req, res) => {
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



// router.get(LOBBY_CHALLENGES, setItem(setItemConfig), setItems({modelName: 'LobbyChallenges', fieldName: 'lobbyId' }), show)

router.post(LOBBY_CHALLENGES, setItem(setItemConfig), create)

router.put(LOBBY_CHALLENGES, update)







// query get all challenges for lobby (all challenge data for challenges both completed and incompleted)
export const show = (req, res) => {
  db.sequelize.query(`
    SELECT c.*, group_concat(ct.input, " |separator| ", ct.output, " |separator| ", ct.hidden, " end|") input_output,
    lc.complete, lc.editorState, lc.duration
    FROM Challenges c
    INNER JOIN ChallengeTest ct
      ON c.id = ct.challengeId
    LEFT OUTER JOIN LobbyChallenges lc
      ON c.id = lc.challengeId and lc.lobbyId in (select id from Lobbies where url = :lobbyId)
    GROUP BY c.id,
             c.name,
             c.question,
             c.initial_editor,
             c.skillLevel,
             c.input_type,
             c.output_type,
             c.createdAt,
             c.updatedAt,
             lc.complete,
             lc.editorState,
             lc.duration`,
  { replacements: { lobbyId: req.params.id }, type: db.sequelize.QueryTypes.SELECT }
).then(challenges => {
  console.log('challenges')
  for (var row of challenges) {
    var tests = [];
    var input_output = row['input_output'].slice(0, row['input_output'].length-5).split(' end|,');
    var pairArr;
    for (var pair of input_output) {
      pairArr = pair.split(' |separator| ')
      pairArr[0] = JSON.parse(pairArr[0]);
      pairArr[1] = JSON.parse(pairArr[1]);
      pairArr[2] = pairArr[2] === '1' ? true : false;
      tests.push(pairArr)
    }
    row['input_output'] = tests;
  }
    console.log(challenges)
    res.json(challenges)
  })
}

router.get(LOBBY_CHALLENGES, show)





export default router
