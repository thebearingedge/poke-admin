import boom from 'boom'

// istanbul ignore next
function notFound({ method, originalUrl }, res) {
  throw boom.notFound(`Cannot ${method} ${originalUrl}`)
}

function errorHandler(err, req, res, next) {
  // istanbul ignore else
  if (boom.isBoom(err)) {
    const { output: { statusCode, payload } } = err
    return res.status(statusCode).json(payload)
  }
  else {
    console.error(err)
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.'
    })
  }
}

export default [notFound, errorHandler]
