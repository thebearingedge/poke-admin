import argon2 from 'argon2'

export const user = {
  userId: process.env.ADMIN_USER_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

export async function seed(knex) {
  const password = await argon2.hash(user.password)
  await knex.raw('truncate table users cascade')
  await knex
    .insert({ ...user, password })
    .into('users')
}
