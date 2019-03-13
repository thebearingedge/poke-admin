import boom from 'boom'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'
import { validate } from '../lib'

const validateLogin = validate({
  body: yup.object().shape({
    username: yup.string().trim().required(),
    password: yup.string().trim().required()
  })
})

const login = ({ users }) =>
  async (req, res) => {
    const { xhr, body: { username, password } } = req
    const { userId } = await users.authenticate({ username, password })
    if (!userId) throw boom.unauthorized('Invalid login.')
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    if (!xhr) return res.status(201).json({ token })
    await new Promise((resolve, reject) => {
      req.token = token
      req.session.regenerate(err => {
        // istanbul ignore if
        if (err) return reject(err)
        req.session.user = { userId }
        resolve()
      })
    })
    res.status(201).json({ userId })
  }

export const handleLogin = ({ users }) => [
  validateLogin,
  login({ users })
]
