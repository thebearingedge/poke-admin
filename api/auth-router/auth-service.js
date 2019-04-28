import argon2 from 'argon2'

export default function usersGateway({ knex }) {
  return {
    async login({ username, password: unhashed }) {
      const user = await knex
        .select(['userId', 'password'])
        .from('users')
        .where({ username })
        .first()
      if (!user) return { userId: null }
      const { userId, password: hashed } = user
      const passwordsMatch = await argon2.verify(hashed, unhashed)
      if (!passwordsMatch) return { userId: null }
      return { userId }
    }
  }
}
