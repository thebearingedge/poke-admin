import bcrypt from 'bcrypt'

export const user = {
  userId: process.env.ADMIN_USER_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

export async function seed(knex) {
  const saltRounds = process.env.NODE_ENV === 'production' ? 12 : 1
  const password = await bcrypt.hash(user.password, saltRounds)
  await knex.raw('truncate table users cascade')
  await knex
    .insert({ ...user, password })
    .into('users')
}
