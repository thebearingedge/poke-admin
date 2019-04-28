import cypress from 'cypress'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import testServer from './support/test-server'
import getConnections from '../database/get-connections'

const [ , , method = 'open' ] = process.argv
const envFile = path.join(process.cwd(), '.env')
const dev = !process.env.CI && method !== 'run'

;(async () => {
  const { knex, redis } = await getConnections()
  const server = await testServer({ dev, knex, redis })
  server.listen(process.env.PORT, async () => {
    try {
      const results = await cypress[method]({
        browser: 'chrome',
        config: {
          baseUrl: process.env.SERVER_URL,
          env: dotenv.parse(fs.readFileSync(envFile))
        }
      })
      results.totalFailed
        ? process.exit(1)
        : process.exit(0)
    }
    catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
})()
