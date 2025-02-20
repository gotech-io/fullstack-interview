import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { ApiError } from '../errors/api-error'

const randomFail: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      // Fails 5% of the time
      if (fastify.config.RANDOM_FAIL && Math.random() < 0.05) {
        throw new ApiError('Boom! Random Failure!', { statusCode: 500 })
      }
    } catch (err) {
      reply.send(err)
    }
  })
}

export default fp(randomFail)
