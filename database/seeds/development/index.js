import chalk from 'chalk'
import * as admin from '../admin'

export async function seed(knex) {

  const trySeed = (knex => async (script, description) => {
    /* eslint-disable no-console */
    console.log(chalk.white(`Running seed script for ${description}...`))
    try {
      await script.seed(knex)
      console.log(chalk.green('done'))
    }
    catch (err) {
      console.error(err)
      console.error(chalk.red(`ERROR: Failed to run seed script for ${description}.`))
      process.exit(1)
    }
  })(knex)

  console.log('\n')

  await trySeed(admin, 'admin user')

  console.log('\n')
}
