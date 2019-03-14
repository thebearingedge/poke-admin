import createServer from './create-server'
import { createKnex, createRedis } from '../database/connections'

const dev = process.env.NODE_ENV !== 'production'
const knex = createKnex()
const redis = createRedis()

;(async () => {
  const server = await createServer({ dev, knex, redis })
  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('listening on port', process.env.PORT)
  })
})()
