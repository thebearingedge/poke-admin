import express from 'express'

export default function createApi() {
  return express()
    .get('/', (req, res) => {
      res.json({ message: 'Hello, World!' })
    })
}
