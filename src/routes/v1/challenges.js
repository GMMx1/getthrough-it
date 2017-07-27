import express from 'express'
import _ from 'lodash'

import { CHALLENGES } from '../routes'
import db from '../../models'
import authRequired from '../../middlewares/authRequired'
import adminRequired from '../../middlewares/adminRequired'

const router = express.Router()
const ChallengeModel = db['Challenge']
const ChallengeTestModel = db['ChallengeTest']

export const show = (req, res) => {
  db.sequelize.query(`
    SELECT c.*, group_concat(ct.input, " |separator| ", ct.output, " |separator| ", ct.hidden, " end|") input_output
    FROM Challenges c
    INNER JOIN ChallengeTest ct
      ON c.id = ct.challengeId
    GROUP BY c.id,
             c.name,
             c.question,
             c.initial_editor,
             c.skillLevel,
             c.createdAt,
             c.updatedAt`,
  { type: db.sequelize.QueryTypes.SELECT }
).then(challenges => {
  for (var row of challenges) {
    var tests = [];
    var input_output = row['input_output'].slice(0, row['input_output'].length-5).split(' end|,');
    var pairArr;
    for (var pair of input_output) {
      pairArr = pair.split(' |separator| ')
      pairArr[0] = JSON.parse(pairArr[0]);
      pairArr[2] = pairArr[2] === '1' ? true : false;
      tests.push(pairArr)
    }
    row['input_output'] = tests;
  }
    res.json(challenges)
  })
}

export const create = (req, res) => {
  ChallengeModel
    .create({ question: req.body.question, name: req.body.name, input_type: JSON.stringify(req.body.input_type), output_type: req.body.output_type, initial_editor: req.body.initial_editor } )
    .then(({dataValues}) => {
      for (var test of req.body.tests) {
        ChallengeTestModel
          .create({challengeId: dataValues.id,
            input: JSON.stringify(test[0]),
            output: test[1],
            hidden: JSON.parse(test[2])})
          .then(res.json.bind(res))
      }
    })
}

export const update = (req, res, next) => {
  let challengeId

  ChallengeModel
  .findOne({
    where: {
      name: req.body.name
    }
  })
  .then(challenge => {
    if (challenge) {
      const question = req.body.question
      const name = req.body.name
      const input_type = JSON.stringify(req.body.input_type)
      const output_type = req.body.output_type
      const initial_editor = req.body.initial_editor
      return challenge.update( {question, name, input_type, output_type, initial_editor} )
    } else {
      res.sendStatus(404)
    }
  })
  .then(({dataValues}) => {
    challengeId = dataValues.id
    return ChallengeTestModel
      .destroy({
        where: {
          challengeId: dataValues.id
        }
      })
  })
  .then((item) => {
    for (var test of req.body.tests) {
      ChallengeTestModel
      .create({
        challengeId: challengeId,
        input: JSON.stringify(test[0]),
        output: test[1],
        hidden: JSON.parse(test[2])
      })
    }
  })
  .catch(next)
}

router.get(CHALLENGES, show)

router.post(CHALLENGES, authRequired, adminRequired, create)

router.put(CHALLENGES, authRequired, adminRequired, update)

export default router
