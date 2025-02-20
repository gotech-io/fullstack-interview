import type { ApiModule } from '../../types/modules'
import { healthController } from './controllers'

const module: ApiModule = {
  controllers: { '/health': healthController },
}

export default module
