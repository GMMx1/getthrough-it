import express from 'express'
import _ from 'lodash'

import { CHALLENGE } from '../routes'
import setItem from '../../middlewares/setItem'
import db from '../../models'

const router = express.Router()
const ChallengeModel = db['Challenge']

export const show = (req, res) => {
  const challenge = req.item
  res.json(challenge)
}

const setItemConfig = {
  modelName: 'Challenge',
  fieldName: 'id',
  type: Number
}

router.get(CHALLENGE, setItem(setItemConfig), show)

export default router
