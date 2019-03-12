import createApi from '../api/create-api'

const app = createApi()

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT)
})
