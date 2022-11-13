import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { GetSensorResponse } from './hueApiTypes'

export const PURPLE_AIR_ROUTES = {
  GET_SENSOR: '/v1/sensors/:sensorId',
}


export class PurpleAirApi {
  private readApi: AxiosInstance
  private writeApi: AxiosInstance
  private readApiKey: string
  private writeApiKey: string

  constructor(readApiKey = '', writeApiKey = '') {
    this.readApiKey = readApiKey
    this.writeApiKey = writeApiKey

    this.readApi = axios.create({
      baseURL: 'https://api.purpleair.com',
      headers: {
        'X-API-Key': readApiKey,
      },
    })
    this.writeApi = axios.create({
      baseURL: 'https://api.purpleair.com',
      headers: {
        'X-API-Key': writeApiKey,
      },
    })
  }

  getSensor(id: string) {
    const route = PURPLE_AIR_ROUTES.GET_SENSOR.replace(':sensorId', id)
    return this.readApi.get<GetSensorResponse>(route)
  }
}
