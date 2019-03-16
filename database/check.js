import getConnections from './get-connections'

(async () => {
  try {
    await getConnections()
    process.exit(0)
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
