import createServer from './create-server'
import { knex, redis } from '../database/connections'

const dev = process.env.NODE_ENV !== 'production'

;(async () => {
  const server = await createServer({ dev, knex, redis })
  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('listening on port', process.env.PORT)
  })
})()
