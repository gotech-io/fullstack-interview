import traps from '@dnlup/fastify-traps'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import sensible from '@fastify/sensible'
import swagger from '@fastify/swagger'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fastify, {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import type { Logger } from 'pino'
import { runDBMigrations } from './db'
import { ApiError } from './errors/api-error'
import { errorHandler } from './errors/error-handler'
import deviceModule from './modules/device'
import healthModule from './modules/health'
import config from './plugins/config'
import db from './plugins/db'
import randomFail from './plugins/random-fail'
import { registerModules } from './register-modules'
import { logger } from './utils/logger'
import { registerTypeBoxFormats } from './utils/typebox'

const ajv = addFormats(new Ajv({}), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
]).addKeyword('kind')

const server = fastify<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  Logger<never>,
  TypeBoxTypeProvider
>({
  loggerInstance: logger,
  bodyLimit: 262144, // approx 250kb
})

// Error handlers
server.setNotFoundHandler((request) => {
  throw new ApiError(`Route ${request.method} ${request.originalUrl} Not Found`, {
    statusCode: 404,
  })
})
server.setErrorHandler(errorHandler)

// Add schema validator and serializer
registerTypeBoxFormats()
server.withTypeProvider<TypeBoxTypeProvider>()

server.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})

// Official plugins
await server.register(cors, {})
await server.register(sensible, {})
await server.register(helmet, {})
await server.register(swagger, {
  openapi: {
    info: {
      title: 'YouCC API',
      description: 'YouCC API',
      version: process.env.npm_package_version || 'N/A',
    },
    servers: [],
  },
})
await server.register(traps)

// Custom plugins
await server.register(config)
await server.register(db)
await server.register(randomFail)

// Register module controller routes
await registerModules(server, [healthModule, deviceModule])
await server.ready()

process.on('unhandledRejection', (err) => {
  server.log.error(err)
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  server.log.error(err)
  process.exit(1)
})

// Run database migrations
await runDBMigrations(server.config)
await server.listen({ host: server.config.HOST, port: server.config.PORT })
