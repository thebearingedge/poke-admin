import session from 'express-session'
import sessionStore from 'connect-redis'

export default function sessionMiddleware({ redis }) {

  const RedisStore = sessionStore(session)

  return session({
    resave: true,
    name: 'token',
    proxy: true,
    genid: req => req.token,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({
      prefix: '',
      client: redis,
      ttl: +process.env.SESSION_EXPIRY
    }),
    cookie: {
      maxAge: +process.env.SESSION_EXPIRY,
      secure: process.env.NODE_ENV === 'production'
    }
  })
}
