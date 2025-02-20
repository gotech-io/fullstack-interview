import { Type } from '@fastify/type-provider-typebox'
import {
  DeviceCreateSchema,
  DeviceResponseSchema,
  deviceToDeviceResponse,
  DeviceUpdateSchema,
} from './dtos'

export async function deviceController(fastify: ApiFastifyInstance) {
  fastify.get(
    '',
    {
      schema: {
        response: { 206: Type.Array(DeviceResponseSchema) },
        tags: ['Devices'],
      },
    },
    async (request, response) => {
      const devices = await fastify.deviceService.getDevices()
      response.status(206)
      return devices.map(deviceToDeviceResponse)
    }
  )

  fastify.post(
    '',
    {
      schema: {
        body: DeviceCreateSchema,
        response: { 201: DeviceResponseSchema },
        tags: ['Devices'],
      },
    },
    async (request, response) => {
      const device = request.body
      const createdDevice = await fastify.deviceService.createDevice({
        ...device,
        lastLoginAt: device.lastLoginAt ? new Date(device.lastLoginAt) : undefined,
      })
      response.status(201)
      return deviceToDeviceResponse(createdDevice)
    }
  )

  const DeviceIdPathSchema = Type.Object({ deviceId: Type.String() })
  type DeviceIdPath = typeof DeviceIdPathSchema.static

  fastify.get(
    '/:deviceId',
    {
      schema: {
        response: { 200: DeviceResponseSchema },
        params: DeviceIdPathSchema,
        tags: ['Devices'],
      },
    },
    async (request) => {
      const device = await fastify.deviceService.getDevice(request.params.deviceId)
      return deviceToDeviceResponse(device)
    }
  )

  fastify.patch(
    '/:deviceId',
    {
      schema: {
        body: DeviceUpdateSchema,
        response: { 200: DeviceResponseSchema },
        params: DeviceIdPathSchema,
        tags: ['Devices'],
      },
    },
    async (request) => {
      const { deviceId } = request.params
      const device = request.body
      const updatedDevice = await fastify.deviceService.updateDevice(deviceId, {
        ...device,
        lastLoginAt: device.lastLoginAt ? new Date(device.lastLoginAt) : undefined,
      })
      return deviceToDeviceResponse(updatedDevice)
    }
  )

  fastify.delete<{ Params: DeviceIdPath }>(
    '/:deviceId',
    {
      schema: {
        response: { 204: {} },
        params: DeviceIdPathSchema,
        tags: ['Devices'],
      },
    },
    async (request, response) => {
      const { deviceId } = request.params
      await fastify.deviceService.deleteDevice(deviceId)
      response.status(204)
    }
  )
}
