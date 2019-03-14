import path from 'path'
import { createKnex, createRedis } from '../connections'

(async () => {
  const knex = createKnex()
  const redis = createRedis()
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
