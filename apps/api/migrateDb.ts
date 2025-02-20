import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import path from 'path'
import postgres from 'postgres'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 })
try {
  const db = drizzle(migrationClient)
  await migrate(db, { migrationsFolder: './src/db/migrations' })
  console.log('Database migrated successfully')
  process.exit(0)
} catch (error) {
  console.error('Error migrating database:', error)
  process.exit(1)
}
