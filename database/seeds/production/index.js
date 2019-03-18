import argon2 from 'argon2'

const user = {
  userId: process.env.ADMIN_USER_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

export async function seed(knex) {
  const admin = await knex
    .select(['userId'])
    .from('users')
    .where({ username: user.username })
    .first()
  if (admin) return
  const password = await argon2.hash(user.password)
  await knex
    .insert({ ...user, password })
    .into('users')
}

export default seed
