import { StatusCodes, getReasonPhrase } from 'http-status-codes'

type ApiErrorOptions = {
  name?: string
  statusCode?: StatusCodes
  errorCode?: ApiErrorCodes
}

export enum ApiErrorCodes {
  UNSPECIFIED = 1000,
}

export class ApiError extends Error {
  public readonly name: string
  public readonly statusCode: StatusCodes
  public readonly errorCode: ApiErrorCodes

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.statusCode = options.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
    this.name = options.name ?? getReasonPhrase(this.statusCode)
    this.errorCode = options.errorCode ?? ApiErrorCodes.UNSPECIFIED

    Error.captureStackTrace(this, ApiError)
  }
}

export type ApiErrorResponseType = {
  error?: string
  stackTrace?: string
  errorCode: ApiErrorCodes
}
