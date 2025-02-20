import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type {
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'

import type { Logger } from 'pino'

// Extend FastifyInstance
declare global {
  type ApiFastifyInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    Logger<never>,
    TypeBoxTypeProvider
  >
}

export {}
