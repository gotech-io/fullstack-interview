import type { ApiModule } from '../../types/modules'
import { deviceController } from './controllers'
import { DeviceService } from './services'

const module: ApiModule = {
  controllers: { '/devices': deviceController },
  services: [DeviceService],
}

export default module
