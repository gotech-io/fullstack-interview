import { devices } from '../schema'
import { OmitForInsert, OmitForUpdate } from './common'

export type DbDevice = typeof devices.$inferSelect
export type DbDeviceInsert = OmitForInsert<typeof devices.$inferInsert>
export type DbDeviceUpdate = OmitForUpdate<typeof devices.$inferInsert>
