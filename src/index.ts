import * as dotenv from 'dotenv'
import config from './config/config.json'
import { HueApi } from './api/hueApi'

dotenv.config()

const hueApi = new HueApi()
const userId = process.env.HUE_API_KEY || null

async function main() {
  try {
    if (userId === null) {
      const result = await hueApi.createUser({ devicetype: 'purpleAirApp' })
      console.log(result.data)
      return
    }

    const lights: Record<string, Record<string, string>> = (await hueApi.getLights(userId)).data
    //console.log(lights)

    Object.entries(lights).forEach(async ([id, data]) => {
      console.log(`Updating light ${data.name}`)
      try {
        const res = await hueApi.updateLight(userId, id, { on: true, sat: 254, bri: 254, hue: 10000 })
        console.log(res.status, res.data)
      } catch (e) {
        console.log(`Light id ${id} doesn't exist`)
      }
    })
  } catch (e) {
    const error = e as Error
    console.log('Error:', error.message)
  }
}

;(async () => main())()
