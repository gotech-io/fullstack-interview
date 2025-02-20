import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

// Helper function to generate a random MAC address
const generateMacAddress = (): string => {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
  ).join(':')
}

// Helper function to generate a random date within the last year
const getRandomDate = (): string => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000)
  return pastDate.toISOString()
}

// Possible values for type, riskLevel, and platform
const types = ['WORKSTATION', 'SERVER', 'MOBILE']
const riskLevels = ['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
const platforms = ['windows', 'linux', 'mac', 'iPhone', 'android']

// Function to generate a random entity
const generateEntity = (): Record<string, string> => {
  return {
    hostname: `host-${uuidv4().slice(0, 8)}`,
    osVersion: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}.${Math.floor(
      Math.random() * 100
    )}`,
    type: types[Math.floor(Math.random() * types.length)],
    macAddress: generateMacAddress(),
    lastLoginAt: getRandomDate(),
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
  }
}

// Generate an array of entities
const generateEntities = (count: number): Record<string, string>[] => {
  return Array.from({ length: count }, generateEntity)
}

for (let i = 1; i <= 10; i++) {
  const entities = generateEntities(1000 * i)
  fs.writeFileSync(`data/devices-${i}.json`, JSON.stringify(entities, null, 2), 'utf-8')
  console.log(`data/devices-${i}.json file has been generated.`)
}
