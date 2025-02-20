import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const deviceTypeEnum = pgEnum('device_type', ['WORKSTATION', 'SERVER', 'MOBILE'])
export const riskLevelEnum = pgEnum('risk_level', ['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])

export const devices = pgTable('devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  hostname: varchar('hostname').notNull(),
  platform: varchar('platform'),
  osVersion: varchar('os_version'),
  macAddress: varchar('mac_address'),
  lastLoginAt: timestamp('last_login_at'),
  type: deviceTypeEnum('type').notNull(),
  riskLevel: riskLevelEnum('risk_level').default('UNKNOWN').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})
