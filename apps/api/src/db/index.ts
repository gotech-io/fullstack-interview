import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import type { Config } from '../plugins/config'

export const runDBMigrations = async (config: Config) => {
  const migrationClient = postgres(config.DATABASE_URL as string, { max: 1 })
  try {
    const db = drizzle(migrationClient)
    await migrate(db, { migrationsFolder: './src/db/migrations' })
    console.log('Database migrated successfully')
  } catch (error) {
    console.error('Error migrating database:', error)
    process.exit(1)
  }
}
