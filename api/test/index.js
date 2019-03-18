import axios from 'axios'
import chai from 'chai'
import noop from 'lodash/noop'
import { chaiStruct } from 'chai-struct'
import createApi from '../create-api'
import * as admin from '../../database/seeds/admin'
import getConnections from '../../database/get-connections'

chai.use(chaiStruct)

let server
let knex
let rootRedis
let rootTransaction
let testRedis
let testTransaction

before('start root transaction and insert test user into database', done => {
  (async () => {
    const connections = await getConnections()
    knex = connections.knex
    rootRedis = connections.redis
    knex.transaction(trx => {
      rootTransaction = trx
      ;(async () => {
        try {
          await admin.seed(rootTransaction)
          done()
        }
        catch (err) {
          return done(err)
        }
      })()
    }).catch(noop)
  })()
})

beforeEach('begin test transaction and start server', done => {
  rootTransaction.transaction(trx => {
    testTransaction = trx
    try {
      testRedis = rootRedis.duplicate()
      const api = createApi({ knex: testTransaction, redis: testRedis })
      server = api.listen(process.env.PORT, done)
    }
    catch (err) {
      done(err)
    }
  }).catch(noop)
})

afterEach('rollback test transaction and stop server', done => {
  (async () => {
    try {
      await testTransaction.rollback()
      await testRedis.quitAsync()
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
  await Promise.all([
    rootTransaction.rollback(),
    knex.destroy(),
    rootRedis.quitAsync()
  ])
})

export const client = axios.create({
  validateStatus: () => true,
  baseURL: process.env.SERVER_URL
})

export const { expect } = chai
export const { user: TEST_USER } = admin
