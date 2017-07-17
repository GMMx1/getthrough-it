import express from 'express'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL
} from '../config'

import {
  AUTH_GITHUB,
  AUTH_GITHUB_CALLBACK,
  AUTH_ME
} from './routes'

import db from '../models'

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
      .findOrCreate({ where: {
        github_uid: profile.id,
        display_name: profile.displayName,
        email: profile.emails[0].value,
        photo_url: profile._json.avatar_url
        }
      })
      .then((user) => {
        done(null, user.dataValues)
      })
      .catch(done)
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User
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

router.get(AUTH_GITHUB, passport.authenticate('github', { scope: ['email profile'] }))

router.get(AUTH_GITHUB_CALLBACK, passport.authenticate('github', { successRedirect: 'http://localhost:3000/lobby/:id'}))

export default router
