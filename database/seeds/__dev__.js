import path from 'path'
import getConnections from '../get-connections'

(async () => {
  const { knex, redis } = await getConnections()
  try {
    await redis.flushallAsync()
    await knex.seed.run({
      directory: path.join(__dirname, 'dev/')
    })
    await knex.destroy()
    await redis.quitAsync()
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
