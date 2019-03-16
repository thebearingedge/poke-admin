import { client, expect, TEST_USER } from '../test'

describe('POST /auth/login', () => {

  context('when the client supplies a bad username', () => {

    const credentials = {
      username: TEST_USER.username + 'lol',
      password: TEST_USER.password
    }

    it('returns an Unauthorized error', async () => {
      const { status, data } = await client.post('/auth/login', credentials)
      expect(status).to.equal(401)
      expect(data).to.include({
        error: 'Unauthorized',
        message: 'Incorrect username or password.'
      })
    })

  })

  context('when the client supplies a bad password', () => {

    const credentials = {
      username: TEST_USER.username,
      password: TEST_USER.password + 'lol'
    }

    it('returns an Unauthorized error', async () => {
      const { status, data } = await client.post('/auth/login', credentials)
      expect(status).to.equal(401)
      expect(data).to.include({
        error: 'Unauthorized',
        message: 'Incorrect username or password.'
      })
    })

  })

  context('when the client supplies invalid credentials', () => {

    const credentials = {}

    it('returns a Bad Request error', async () => {
      const { status, data } = await client.post('/auth/login', credentials)
      expect(status).to.equal(400)
      expect(data).to.include({
        error: 'Bad Request',
        message: 'Validation error.'
      })
    })

  })

  context('when the client supplies correct credentials', () => {

    const credentials = {
      username: TEST_USER.username,
      password: TEST_USER.password
    }

    it('returns a session token', async () => {
      const { status, data } = await client.post('/auth/login', credentials)
      expect(status).to.equal(201)
      expect(data).to.have.structure({
        token: String
      })
    })

  })

  context('when the client supplies correct credentials over XHR', () => {

    const credentials = {
      username: TEST_USER.username,
      password: TEST_USER.password
    }

    it('returns a session cookie and user payload', async () => {
      const { status, data, headers } = await client.post('/auth/login', credentials, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      expect(status).to.equal(201)
      expect(data).to.deep.equal({
        userId: TEST_USER.userId
      })
      const { 'set-cookie': [ cookie ] } = headers
      expect(cookie)
        .to.include('Expires=')
        .and.to.include('HttpOnly')
        .and.to.include('Path=')
        .and.to.include('token=')
    })

  })

})
