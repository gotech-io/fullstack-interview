import dotenv from 'dotenv'
import {
  accessorMiddleware,
  bool,
  customCleanEnv,
  host,
  port,
  str,
  strictProxyMiddleware,
} from 'envalid'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import path from 'path'
import { NodeEnv } from '../types/common'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const config = customCleanEnv(
  process.env,
  {
    NODE_ENV: str({
      choices: [NodeEnv.DEVELOPMENT, NodeEnv.TEST, NodeEnv.PRODUCTION],
      default: NodeEnv.PRODUCTION,
    }),
    LOG_LEVEL: str({ default: 'info' }),
    HOST: host({ default: '0.0.0.0' }),
    PORT: port({ default: 3000 }),
    DATABASE_URL: str(),
    RANDOM_FAIL: bool({ default: false }),
  },
  // https://github.com/af/envalid/issues/141
  (cleanedEnv, rawEnv) => {
    return strictProxyMiddleware(accessorMiddleware(cleanedEnv, rawEnv), rawEnv, {
      extraInspectables: ['getter', 'setter'],
    })
  }
)

export type Config = typeof config
export type ConfigPlugin = {
  config: Config
}

declare module 'fastify' {
  interface FastifyInstance {
    config: Config
  }
}

const configPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('config', config)
}

export default fp(configPlugin)
