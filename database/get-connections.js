import { promisifyAll } from 'bluebird'
import Knex from 'knex'
import retry from 'promise-retry'
import { RedisClient } from 'redis'
import snakeCase from 'lodash/snakeCase'
import camelKeys from './lib/camel-keys'

promisifyAll(RedisClient.prototype)

let knex
let redis

const connectToPostgres = () => {
  knex = Knex({
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    postProcessResponse: camelKeys,
    wrapIdentifier: (value, wrap) => wrap(snakeCase(value))
  })
  return retry(async retry => {
    try {
      await knex.raw('select 1')
      return knex
    }
    catch (err) /* istanbul ignore next */ {
      if (err.code !== 'ETIMEDOUT') return retry(err)
      redis && redis.end(false)
      throw err
    }
  }, { retries: 5 })
}

const connectToRedis = () => {
  return retry(async retry => {
    try {
      await new Promise((resolve, reject) => {
        redis = new RedisClient({
          url: process.env.REDIS_URL,
          retry_strategy: /* istanbul ignore next */ ({ error }) => {
            reject(error)
            return null
          }
        })
        redis.on('ready', () => redis.quit(resolve))
      })
      return new RedisClient({
        url: process.env.REDIS_URL
      })
    }
    catch (err) /* istanbul ignore next */ {
      if (err.code !== 'ETIMEDOUT') return retry(err)
      knex && knex.destroy()
      throw err
    }
  }, { retries: 5 })
}

export default async function getConnections() {
  try {
    const [ knex, redis ] = await Promise.all([
      connectToPostgres(),
      connectToRedis()
    ])
    return { knex, redis }
  }
  catch (err) /* istanbul ignore next */ {
    console.error(err)
    process.exit(1)
  }
}
