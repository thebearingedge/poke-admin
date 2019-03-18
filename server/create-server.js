import express from 'express'
import helmet from 'helmet'
import createApi from '../api/create-api'
import createClient from '../client/create-client'

export default async function createServer({ dev, knex, redis }) {
  return express()
    .enable('trust-proxy')
    .use(helmet())
    .use('/api', createApi({ knex, redis }))
    .use(await createClient({ dev, redis }))
}
