import Boom from 'boom'
import * as yup from 'yup'
import pick from 'lodash/pick'

export default function validate(schemas) {
  const keys = Object.keys(schemas)
  const schema = yup.object().shape(schemas)
  const options = { abortEarly: false, stripUnknown: true }
  return async (req, res, next) => {
    try {
      const validated = await schema.validate(pick(req, keys), options)
      Object.assign(req, validated)
      next()
    }
    catch (invalid) {
      const err = Boom.badRequest('Validation error.')
      err.output.payload.errors = invalid
      throw err
    }
  }
}
