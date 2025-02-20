import { eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { devices } from '../../db/schema'
import { DbDevice, DbDeviceInsert, DbDeviceUpdate } from '../../db/types'
import { ApiError } from '../../errors/api-error'
import { BaseService } from '../base-service'

declare module 'fastify' {
  interface FastifyInstance {
    deviceService: DeviceService
  }
}

export class DeviceService extends BaseService {
  constructor(fastify: ApiFastifyInstance) {
    super(fastify)
  }

  public async createDevice(device: DbDeviceInsert): Promise<DbDevice> {
    const deviceInsertResults = await this.db.insert(devices).values(device).returning().execute()
    return deviceInsertResults[0]
  }

  public async getDevices(): Promise<DbDevice[]> {
    const devices = await this.db.query.devices.findMany()
    return devices
  }

  public async getDevice(id: string): Promise<DbDevice> {
    const device = await this.db.query.devices.findFirst({
      where: eq(devices.id, id),
    })

    if (!device) {
      throw new ApiError('Device not found', { statusCode: StatusCodes.NOT_FOUND })
    }
    return device
  }

  public async updateDevice(id: string, device: DbDeviceUpdate): Promise<DbDevice> {
    const updatedDevice = await this.db
      .update(devices)
      .set(device)
      .where(eq(devices.id, id))
      .returning()
      .execute()

    return updatedDevice[0]
  }

  public async deleteDevice(id: string): Promise<void> {
    await this.db.delete(devices).where(eq(devices.id, id)).execute()
  }
}
