import { drizzle } from 'drizzle-orm/postgres-js'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import postgres from 'postgres'
import * as schema from '../db/schema'
import { config } from './config'

const queryClient = postgres(config.DATABASE_URL)
export const db = drizzle(queryClient, { schema })

export type DB = typeof db
export type DBPlugin = {
  db: DB
}

declare module 'fastify' {
  interface FastifyInstance {
    db: DB
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('db', db)
}

export default fp(dbPlugin)
