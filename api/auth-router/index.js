import Router from 'express-promise-router'
import * as middleware from './middleware'
import authService from './auth-service'

export default function authRouter({ knex }) {
  const auth = authService({ knex })
  return Router()
    .post('/login', middleware.handleLogin({ auth }))
}
