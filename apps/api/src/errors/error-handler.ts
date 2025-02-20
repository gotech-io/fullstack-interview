import { FastifyReply, FastifyRequest } from 'fastify'
import { NodeEnv } from '../types/common'
import { ApiErrorCodes, ApiErrorResponseType } from './api-error'

export function errorHandler(
  this: ApiFastifyInstance,
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const errorMessage = error.message
  const statusCode = 'statusCode' in error ? (error.statusCode as number) : 500
  const errorCode =
    'errorCode' in error ? (error.errorCode as ApiErrorCodes) : ApiErrorCodes.UNSPECIFIED

  const response: ApiErrorResponseType = {
    error: errorMessage,
    errorCode: errorCode,
  }

  if (this.config.NODE_ENV === NodeEnv.DEVELOPMENT) {
    response.stackTrace = error.stack
  }

  this.log.debug(
    {
      method: request.method,
      url: request.url,
      body: request.body,
      params: request.params,
    },
    `Error: ${errorMessage}`
  )
  this.log.error(error)
  reply.status(statusCode).send(response)
}
