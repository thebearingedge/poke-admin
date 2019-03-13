import express from 'express'
import authRouter from './auth-router'
import { errorHandler } from './lib'
import sessionMiddleware from '../server/session-middleware'

export default function createApi({ knex, redis }) {
  return express()
    .use(express.json())
    .use(sessionMiddleware({ redis }))
    .use('/auth', authRouter({ knex }))
    .use(errorHandler)
}
