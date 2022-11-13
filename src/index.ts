import * as dotenv from 'dotenv'
import { HueApi } from './api/hueApi'
import { PurpleAirApi } from './api/purpleAirApi'
import { aqiFromPM } from './utils/aqiFromPM'

dotenv.config()

const hueApi = new HueApi()
const userId = process.env.HUE_API_KEY || null
const purpleAirReadApiKey = process.env.PURPLE_AIR_READ_API_KEY || ''
const purpleAirWriteApiKey = process.env.PURPLE_AIR_WRITE_API_KEY || ''
const homeAirSensorId = process.env.HOME_AIR_SENSOR || ''

const purpleAirApi = new PurpleAirApi(purpleAirReadApiKey, purpleAirWriteApiKey)

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

    try {
      const result = await purpleAirApi.getSensor(homeAirSensorId)
      const { data } = result
      const pm = data.sensor.stats['pm2.5_10minute']
      const aqi = aqiFromPM(pm)
      console.log(`Sensor ${data.sensor.name} AQI: ${aqi}`)
    } catch (e) {
      console.log(`Sensor ${homeAirSensorId} errored`, e)
    }
  } catch (e) {
    const error = e as Error
    console.log('Error:', error.message)
  }
}

;(async () => main())()
