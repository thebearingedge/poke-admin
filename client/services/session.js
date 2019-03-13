import { isServer } from '../lib'

let session

const createSession = _user => ({
  get user() {
    return _user
  },
  start(user) {
    _user = user
  }
})

export default function initSession(user) {
  if (isServer) return createSession(user)
  session = session || createSession(user)
  return session
}
