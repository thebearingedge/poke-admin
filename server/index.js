import createServer from './create-server'
import getConnections from '../database/get-connections'

;(async () => {
  const { knex, redis } = await getConnections()
  const dev = process.env.NODE_ENV !== 'production'
  const server = await createServer({ dev, knex, redis })
  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('listening on port', process.env.PORT)
  })
})()
