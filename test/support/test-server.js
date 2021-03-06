import express from 'express'
import * as seeds from '../../database/seeds'
import createServer from '../../server/create-server'

export default async function testServer({ dev, knex, redis }) {
  return express()
    .post('/cypress/seed/:type', async (req, res) => {
      try {
        const { params: { type }, query: options } = req
        await seeds[type](knex, options)
        res.end()
      }
      catch (err) {
        console.error(err)
        res.sendStatus(500)
      }
    })
    .use(await createServer({ dev, knex, redis }))
}
