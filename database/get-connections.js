import { promisifyAll } from 'bluebird'
import Knex from 'knex'
import retry from 'promise-retry'
import { RedisClient, createClient } from 'redis'
import snakeCase from 'lodash/snakeCase'
import camelKeys from './lib/camel-keys'

promisifyAll(RedisClient.prototype)

let knex
let redis
let connected = false

export const connectToPostgres = () => {
  knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
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

export const connectToRedis = () => {
  return retry(async retry => {
    try {
      await new Promise((resolve, reject) => {
        redis = createClient({
          url: process.env.REDIS_URL,
          retry_strategy: /* istanbul ignore next */ ({ error }) => {
            reject(error)
            return null
          }
        })
        redis.on('ready', () => redis.quit(resolve))
      })
      return createClient({
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
  if (connected) return { knex, redis }
  try {
    const [ knex, redis ] = await Promise.all([
      connectToPostgres(),
      connectToRedis()
    ])
    connected = true
    return { knex, redis }
  }
  catch (err) /* istanbul ignore next */ {
    console.error(err)
    process.exit(1)
  }
}
