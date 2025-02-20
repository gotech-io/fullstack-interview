import { Type } from '@fastify/type-provider-typebox'
import { DbDevice } from '../../db/types'

export const DeviceTypeSchema = Type.Union([
  Type.Literal('WORKSTATION'),
  Type.Literal('SERVER'),
  Type.Literal('MOBILE'),
])
export type DeviceType = typeof DeviceTypeSchema.static

export const RiskLevelSchema = Type.Union([
  Type.Literal('UNKNOWN'),
  Type.Literal('LOW'),
  Type.Literal('MEDIUM'),
  Type.Literal('HIGH'),
  Type.Literal('CRITICAL'),
])
export type RiskLevel = typeof RiskLevelSchema.static

export const DeviceResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  hostname: Type.String(),
  platform: Type.Optional(Type.String()),
  osVersion: Type.Optional(Type.String()),
  macAddress: Type.Optional(Type.String()),
  lastLoginAt: Type.Optional(Type.String({ format: 'date-time' })),
  type: DeviceTypeSchema,
  riskLevel: RiskLevelSchema,
})
export type DeviceResponse = typeof DeviceResponseSchema.static

const commonDeviceCreateUpdateFields = {
  macAddress: Type.Optional(Type.String()),
  lastLoginAt: Type.Optional(Type.String({ format: 'date-time' })),
  riskLevel: Type.Optional(RiskLevelSchema),
  platform: Type.Optional(Type.String()),
}

export const DeviceCreateSchema = Type.Object({
  hostname: Type.String(),
  osVersion: Type.Optional(Type.String()),
  type: DeviceTypeSchema,
  ...commonDeviceCreateUpdateFields,
})
export type DeviceCreate = typeof DeviceCreateSchema.static

export const DeviceUpdateSchema = Type.Object({
  hostname: Type.Optional(Type.String()),
  osVersion: Type.Optional(Type.String()),
  ...commonDeviceCreateUpdateFields,
})
export type DeviceUpdate = typeof DeviceUpdateSchema.static

export const deviceToDeviceResponse = (device: DbDevice) => ({
  ...device,
  macAddress: device.macAddress ?? undefined,
  osVersion: device.osVersion ?? undefined,
  platform: device.platform ?? undefined,
  lastLoginAt: device.lastLoginAt?.toISOString(),
})
