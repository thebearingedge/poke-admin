import { promisifyAll } from 'bluebird'
import Knex from 'knex'
import { RedisClient } from 'redis'
import snakeCase from 'lodash/snakeCase'
import camelKeys from './lib/camel-keys'

promisifyAll(RedisClient.prototype)

export const knex = Knex({
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  postProcessResponse: camelKeys,
  wrapIdentifier: (value, wrap) => wrap(snakeCase(value))
})

export const redis = new RedisClient({
  url: process.env.REDIS_URL
})
