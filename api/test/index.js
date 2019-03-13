import axios from 'axios'
import bcrypt from 'bcrypt'
import chai from 'chai'
import faker from 'faker'
import noop from 'lodash/noop'
import { chaiStruct } from 'chai-struct'
import createApi from '../create-api'
import { knex, redis } from '../../database/connections'

chai.use(chaiStruct)

let server
let _knex
let _redis
let _trx

before('start root transaction and insert test user into database', done => {
  knex.transaction(trx => {
    _trx = trx
    ;(async () => {
      try {
        const { password: unhashed } = TEST_USER
        const password = await bcrypt.hash(unhashed, 1)
        await _trx
          .insert({ ...TEST_USER, password })
          .into('users')
        done()
      }
      catch (err) {
        return done(err)
      }
    })()
  }).catch(noop)
})

beforeEach('start nested transaction and start server', done => {
  _trx.transaction(trx => {
    _knex = trx
    try {
      _redis = redis.duplicate()
      const api = createApi({ knex: _knex, redis: _redis })
      server = api.listen(process.env.PORT, done)
    }
    catch (err) {
      done(err)
    }
  }).catch(noop)
})

afterEach('rollback nested transaction and stop server', done => {
  (async () => {
    try {
      await _knex.rollback()
      await _redis.quitAsync()
      done()
    }
    catch (err) {
      done(err)
    }
    finally {
      server.close()
    }
  })()
})

after('rollback root transaction close database connections', async () => {
  await _trx.rollback()
  await knex.destroy()
  await redis.quitAsync()
})

export const client = axios.create({
  validateStatus: () => true,
  baseURL: process.env.API_URL
})

export const TEST_USER = {
  userId: faker.random.uuid(),
  username: 'admin',
  password: 'password'
}

export { expect } from 'chai'
