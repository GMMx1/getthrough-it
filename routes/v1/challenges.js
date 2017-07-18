import express from 'express'
import _ from 'lodash'

import { CHALLENGES } from '../routes'
// import setItems from '../../middlewares/setItems'
import db from '../../models'

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
             c.input_type,
             c.output_type,
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




router.get(CHALLENGES, show)

export default router
