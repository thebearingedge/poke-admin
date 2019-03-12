import axios from 'axios'
import createApi from '../create-api'

let server

beforeEach('start server', done => {
  const api = createApi()
  server = api.listen(process.env.PORT, done)
})

afterEach('stop server', done => {
  server.close(done)
})

export const client = axios.create({
  validateStatus: () => true,
  baseURL: process.env.API_URL
})

export { expect } from 'chai'
