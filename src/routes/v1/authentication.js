import express from 'express'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL
} from '../../config'

import {
  AUTH_GITHUB,
  AUTH_GITHUB_CALLBACK,
  AUTH_ME
} from '../routes'

import db from '../../models'
import authRequired from '../../middlewares/authRequired'

const router = express.Router()
const UserModel = db['User']

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    UserModel
      .findOrCreate({ 
        where: {
          github_uid: profile.id,
          display_name: profile.displayName,
          email: profile._json.email,
          photo_url: profile._json.avatar_url
        }
      })
      .then((response) => {
        done(null, response[0].dataValues)
      })
      .catch((error) => {
        console.log('GOT HERE', error)
        done(error)
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  UserModel
    .findById(id)
    .then((user) => {
      done(null, {
        id: user.id,
        display_name: user.display_name,
        email: user.email,
        photo_url: user.photo_url
      })
    })
})

router.get(AUTH_ME, authRequired, (req, res) => {
  res.json(req.user)
})

router.get(
  AUTH_GITHUB, 
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  AUTH_GITHUB_CALLBACK, 
  passport.authenticate('github'), 
  (req, res) => {
    res.sendStatus(200)
  }
)

export default router
