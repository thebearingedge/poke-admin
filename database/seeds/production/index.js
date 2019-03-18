import * as admin from '../admin'

export async function seed(knex) {
  const user = await knex
    .select(['userId'])
    .from('users')
    .where({ username: admin.user.username })
    .first()
  if (!user) return admin.seed(knex)
}

export default seed
