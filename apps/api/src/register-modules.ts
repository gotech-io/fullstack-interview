import swaggerUI from '@fastify/swagger-ui'
import { toCamelCase } from 'drizzle-orm/casing'
import { ApiModule } from './types/modules'

const registerRoutesForModule = async (fastify: ApiFastifyInstance, module: ApiModule) => {
  if (!module.controllers) return

  await Promise.all(
    Object.entries(module.controllers).map(([prefix, controller]) => {
      fastify.register(controller, { prefix })
    })
  )
}

const registerServicesForModule = async (fastify: ApiFastifyInstance, module: ApiModule) => {
  if (!module.services) return

  module.services.map((service): void => {
    fastify.decorate(toCamelCase(service.name), new service(fastify))
  })
}

export const registerModules = async (fastify: ApiFastifyInstance, modules: ApiModule[]) => {
  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
  })

  // Register routes
  modules.forEach((module) => registerRoutesForModule(fastify, module))

  // Register services
  modules.forEach((module) => registerServicesForModule(fastify, module))
}
