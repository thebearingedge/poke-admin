import bcrypt from 'bcrypt'

export default function usersGateway({ knex }) {
  return {
    async authenticate({ username, password: unhashed }) {
      const user = await knex
        .select(['userId', 'password'])
        .from('users')
        .where({ username })
        .first()
      if (!user) return { userId: null }
      const { userId, password: hashed } = user
      const passwordsMatch = await bcrypt.compare(unhashed, hashed)
      if (!passwordsMatch) return { userId: null }
      return { userId }
    }
  }
}
