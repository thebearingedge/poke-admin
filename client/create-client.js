import express from 'express'
import next from 'next'
import sessionMiddleware from '../server/session-middleware'

export default async function createClient({ dev, redis }) {
  const pages = next({ dev, dir: __dirname })
  const handler = pages.getRequestHandler()
  await pages.prepare()
  return express()
    .use(sessionMiddleware({ redis }))
    .use((req, res) => handler(req, res))
}
