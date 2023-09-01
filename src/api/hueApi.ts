import axios, { AxiosInstance } from 'axios'
import https from 'https'
import { hueBridgeIp } from '../config/config.json'
import { HueLight } from './hueApi.types'

export const HUE_ROUTES = {
  DEBUG: `/debug/clip.html`,
  CREATE_USER: '/api',
  LIGHTS: '/api/:userId/lights',
  LIGHT: '/api/:userId/lights/:lightId',
  LIGHT_STATE: '/api/:userId/lights/:lightId/state',
}

interface CreateUserOptions {
  devicetype: string
}

interface UpdateLightOptions {
  on?: boolean
  sat?: number
  bri?: number
  hue?: number
}

export class HueApi {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: `https://${hueBridgeIp}`,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    })
  }

  createUser(data?: CreateUserOptions) {
    return this.api.post(HUE_ROUTES.CREATE_USER, data)
  }

  async getLights(userId: string): Promise<HueLight[]> {
    const route = HUE_ROUTES.LIGHTS.replace(':userId', userId)
    const records = (await this.api.get<Record<string, Omit<HueLight, 'id'>>>(route)).data

    return Object.entries(records).map(([id, rawLight]) => ({ ...rawLight, id }))
  }

  getLight(userId: string, lightId: string) {
    const route = HUE_ROUTES.LIGHTS.replace(':userId', userId).replace(':lightId', lightId)
    return this.api.get<HueLight>(route)
  }

  async updateLight(userId: string, light: HueLight, data?: UpdateLightOptions) {
    const route = HUE_ROUTES.LIGHT_STATE.replace(':userId', userId).replace(':lightId', light.modelid)
    try {
      await this.api.put(route, data)
    } catch (e) {
      let error = e as Error
      console.log(`Error updating light ${light.name}`, error.message)
    }
  }
}
