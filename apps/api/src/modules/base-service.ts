import { Logger } from 'pino'
import { Config } from '../plugins/config'
import { DB } from '../plugins/db'

export abstract class BaseService {
  protected db: DB
  protected config: Config
  protected log: Logger<never>

  constructor(protected fastify: ApiFastifyInstance) {
    this.db = fastify.db
    this.config = fastify.config
    this.log = fastify.log
  }
}
