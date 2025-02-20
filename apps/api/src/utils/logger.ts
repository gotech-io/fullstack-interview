import pino, { LoggerOptions } from 'pino'
import { NodeEnv } from '../types/common'

// Setting for logger in different environments
const envToLogger: Record<string, LoggerOptions<never>> = {
  development: {
    redact: ['req.headers.authorization'],
    level: process.env.LOG_LEVEL ?? 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss.l Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: { redact: ['req.headers.authorization'], level: process.env.LOG_LEVEL ?? 'info' },
}

export const logger = pino(envToLogger[process.env.NODE_ENV ?? NodeEnv.PRODUCTION])
