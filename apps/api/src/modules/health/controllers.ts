import { Type } from '@fastify/type-provider-typebox'
import { sql } from 'drizzle-orm'

export async function healthController(fastify: ApiFastifyInstance) {
  fastify.get(
    '',
    {
      schema: {
        response: { 200: Type.Object({ status: Type.String({ examples: ['OK'] }) }) },
        tags: ['Health'],
      },
    },
    async () => {
      await fastify.db.execute(sql`SELECT 1`)
      return { status: 'OK' }
    }
  )
}
