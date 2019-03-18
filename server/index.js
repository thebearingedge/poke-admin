import pgBump from 'pg-bump'
import createServer from './create-server'
import seed from '../database/seeds/production'
import getConnections from '../database/get-connections'

;(async () => {
  /* eslint-disable no-console */
  try {
    console.log('Acquiring database connections...')
    const { knex, redis } = await getConnections()
    console.log('Connections established.')

    console.log('Running latest migrations...')
    await pgBump.up({
      files: 'database/migrations/',
      connectionVar: 'DATABASE_URL',
      journalTable: 'schema_journal'
    })

    console.log('Seeding database if needed...')
    await seed(knex)
    console.log('Database seeded.')

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
