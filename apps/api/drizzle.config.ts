import type { Config } from 'drizzle-kit'
import path from 'path'

import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
