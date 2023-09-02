import { config } from 'dotenv'
import ColorConverter from 'cie-rgb-color-converter'
import { HueApi } from './api/hueApi'
import { PurpleAirApi } from './api/purpleAirApi'
import { aqiFromPM, colorFromPm } from './utils/aqi'
import { AQI_COLORS, AQI_COLOR_VALUES } from './constants/aqi'

config()

const hueApi = new HueApi()
const userId = process.env.HUE_API_KEY || null
const purpleAirReadApiKey = process.env.PURPLE_AIR_READ_API_KEY || ''
const purpleAirWriteApiKey = process.env.PURPLE_AIR_WRITE_API_KEY || ''
const homeAirSensorId = process.env.HOME_AIR_SENSOR || ''
const defaultLights = (process.env.DEFAULT_LIGHTS ?? '').split(',') || []

console.log(defaultLights)

const purpleAirApi = new PurpleAirApi(purpleAirReadApiKey, purpleAirWriteApiKey)

async function main() {
  try {
    if (userId === null) {
      const result = await hueApi.createUser({ devicetype: 'purpleAirApp' })
      console.log(result.data)
      return
    }

    const allLights = await hueApi.getLights(userId)
    const lights = allLights.filter((light) => defaultLights.includes(light.name))

    let pm
    try {
      const result = await purpleAirApi.getSensor(homeAirSensorId)
      const { data } = result
      pm = data.sensor.stats['pm2.5_10minute']
      const aqi = aqiFromPM(pm)
      console.log(`Sensor ${data.sensor.name} AQI: ${aqi}`)
    } catch (e) {
      console.log(`Sensor ${homeAirSensorId} errored`, e)
      pm = -1
    }

    const color = colorFromPm(pm)

    lights.forEach(async (light) => {
      console.log(`Updating light ${light.name}`)
      const { r, b, g } = color.rgb
      const { x, y } = ColorConverter.rgbToXy(r, g, b, light.modelid)
      const xy: [number, number] = [+x.toFixed(4), +y.toFixed(4)]
      await hueApi.updateLight(userId ?? '', light, { on: true, xy })
    })
  } catch (e) {
    const error = e as Error
    console.log('Error:', error.message)
  }
}

;(async () => main())()
