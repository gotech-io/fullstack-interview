import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type {
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyPluginOptions,
  RawServerDefault,
} from 'fastify'
import type { Params } from 'fastify-cron'
import type { Logger } from 'pino'
import { BaseProvider } from '../modules/base-provider'
import { BaseService } from '../modules/base-service'

type ApiParams = Omit<Params, 'onTick' | 'onComplete'> & {
  onTick: (fastify: ApiFastifyInstance) => void
  onComplete?: (fastify: ApiFastifyInstance) => void
}

type ServiceConstructor = new (fastify: ApiFastifyInstance) => BaseService
type ProviderConstructor = new (fastify: ApiFastifyInstance) => BaseProvider

type ApiController =
  | FastifyPluginAsync<FastifyPluginOptions, RawServerDefault, TypeBoxTypeProvider, Logger<never>>
  | FastifyPluginCallback<
      FastifyPluginOptions,
      RawServerDefault,
      TypeBoxTypeProvider,
      Logger<never>
    >

export type ApiModule = {
  controllers?: {
    [prefix: string]: ApiController
  }
  services?: ServiceConstructor[]
  providers?: ProviderConstructor[]
  crons?: ApiParams[]
}
