import axios from 'axios'
import chai from 'chai'
import noop from 'lodash/noop'
import { chaiStruct } from 'chai-struct'
import createApi from '../create-api'
import * as admin from '../../database/seeds/admin'
import { createKnex, createRedis } from '../../database/connections'

chai.use(chaiStruct)

let server
let knex
let redis
let _knex
let _redis
let _trx

before('start root transaction and insert test user into database', done => {
  knex = createKnex()
  redis = createRedis()
  knex.transaction(trx => {
    _trx = trx
    ;(async () => {
      try {
        await admin.seed(trx)
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

export const { expect } = chai
export const { user: TEST_USER } = admin
