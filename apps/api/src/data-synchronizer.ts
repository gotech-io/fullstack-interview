import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { DeviceCreate } from './modules/device/dtos'
import { logger } from './utils/logger'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const serverUrl = `http://${process.env.HOST}:${process.env.PORT}`

async function syncDevices() {
  const dataDir = path.resolve(process.cwd(), 'data')
  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith('.json'))
  const allDevices: DeviceCreate[] = []

  for (const file of files) {
    const rawData = fs.readFileSync(path.join(dataDir, file), 'utf8')
    const devices = JSON.parse(rawData) as DeviceCreate[]
    allDevices.push(...devices)
    logger.info(`Loaded ${devices.length} devices from ${file}`)
  }

  let index = 0
  for (const device of allDevices) {
    const response = await fetch(`${serverUrl}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    })

    if (!response.ok) {
      logger.error(`Failed to sync device ${device.hostname}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    logger.info(`Synced device ${device.hostname} (${++index}/${allDevices.length})`)
  }
}

const start = new Date()
await syncDevices()
const end = new Date()
logger.info(`Sync completed in ${end.getTime() - start.getTime()}ms`)
