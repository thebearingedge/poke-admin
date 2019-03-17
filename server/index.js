import pgBump from 'pg-bump'
import createServer from './create-server'
import getConnections from '../database/get-connections'

;(async () => {
  /* eslint-disable no-console */
  try {
    console.log(Object.keys(process.env))
    console.log('Acquiring database connections...')
    const { knex, redis } = await getConnections()
    console.log('Running latest migrations...')
    await pgBump.up({
      files: 'database/migrations/',
      connectionVar: 'DATABASE_URL',
      journalTable: 'schema_journal'
    })
    console.log('Connections established.')
    const dev = process.env.NODE_ENV !== 'production'
    const server = await createServer({ dev, knex, redis })
    server.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT, '.')
    })
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
