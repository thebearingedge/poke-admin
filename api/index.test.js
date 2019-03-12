import { client, expect } from './test'

describe('GET /', () => {

  it('returns an Object', async () => {
    const { status, data } = await client.get('/')
    expect(status).to.equal(200)
    expect(data).to.deep.equal({ message: 'Hello, World!' })
  })

})
