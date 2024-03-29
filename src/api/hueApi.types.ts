export interface GetSensorResponse {
  api_version: string
  time_stamp: number
  data_time_stamps: number
  sensor: Sensor
}

export interface Sensor {
  sensor_index: number
  last_modified: number
  date_created: number
  last_seen: number
  private: number
  is_owner: number
  name: string
  icon: number
  location_type: number
  model: string
  hardware: string
  led_brightness: number
  firmware_version: string
  rssi: number
  uptime: number
  pa_latency: number
  memory: number
  position_rating: number
  latitude: number
  longitude: number
  altitude: number
  channel_state: number
  channel_flags: number
  channel_flags_manual: number
  channel_flags_auto: number
  confidence: number
  confidence_auto: number
  confidence_manual: number
  humidity: number
  humidity_a: number
  temperature: number
  temperature_a: number
  pressure: number
  pressure_a: number
  analog_input: number
  'pm1.0': number
  'pm1.0_a': number
  'pm1.0_b': number
  'pm2.5': number
  'pm2.5_a': number
  'pm2.5_b': number
  'pm2.5_alt': number
  'pm2.5_alt_a': number
  'pm2.5_alt_b': number
  'pm10.0': number
  'pm10.0_a': number
  'pm10.0_b': number
  scattering_coefficient: number
  scattering_coefficient_a: number
  scattering_coefficient_b: number
  deciviews: number
  deciviews_a: number
  deciviews_b: number
  visual_range: number
  visual_range_a: number
  visual_range_b: number
  '0.3_um_count': number
  '0.3_um_count_a': number
  '0.3_um_count_b': number
  '0.5_um_count': number
  '0.5_um_count_a': number
  '0.5_um_count_b': number
  '1.0_um_count': number
  '1.0_um_count_a': number
  '1.0_um_count_b': number
  '2.5_um_count': number
  '2.5_um_count_a': number
  '2.5_um_count_b': number
  '5.0_um_count': number
  '5.0_um_count_a': number
  '5.0_um_count_b': number
  '10.0_um_count': number
  '10.0_um_count_a': number
  '10.0_um_count_b': number
  'pm1.0_cf_1': number
  'pm1.0_cf_1_a': number
  'pm1.0_cf_1_b': number
  'pm1.0_atm': number
  'pm1.0_atm_a': number
  'pm1.0_atm_b': number
  'pm2.5_atm': number
  'pm2.5_atm_a': number
  'pm2.5_atm_b': number
  'pm2.5_cf_1': number
  'pm2.5_cf_1_a': number
  'pm2.5_cf_1_b': number
  'pm10.0_atm': number
  'pm10.0_atm_a': number
  'pm10.0_atm_b': number
  'pm10.0_cf_1': number
  'pm10.0_cf_1_a': number
  'pm10.0_cf_1_b': number
  primary_id_a: number
  primary_key_a: string
  primary_id_b: number
  primary_key_b: string
  secondary_id_a: number
  secondary_key_a: string
  secondary_id_b: number
  secondary_key_b: string
  stats: SensorStats
  stats_a: SensorStats
  stats_b: SensorStats
}

export interface SensorStats {
  'pm2.5': number
  'pm2.5_10minute': number
  'pm2.5_30minute': number
  'pm2.5_60minute': number
  'pm2.5_6hour': number
  'pm2.5_24hour': number
  'pm2.5_1week': number
  time_stamp: number
}

// https://developers.meethue.com/develop/hue-api/lights-api/
export interface HueLightState {
  on: boolean
  bri: number // uint8:  1 to 254
  hue: number // uint16: 0 to 65535
  sat: number // uint8:  0 to 254 (max saturation)
  effect: HueLightEffect
  xy: [number|string, number|string] // [float, float] xy in CIE colorspace
  ct: number // uint16:  Mired Color temperature of the light
  alert: HueLightAlert
  colormode: string
  mode: string
  reachable: boolean
}

export enum HueLightEffect {
  NONE = 'none',
  COLORLOOP = 'COLORLOOP',
}

/**
 * Indicates the color mode in which the light is working,
 * this is the last command type it received. Values are “hs”
 * for Hue and Saturation, “xy” for XY and “ct” for Color Temperature.
 * This parameter is only present when the light supports at least
 * one of the values.
 */
export enum HueLightColorMode {
  HS = 'hs',
  CT = 'ct',
}

export enum HueLightAlert {
  NONE = 'none', // The light is not performing an alert effect
  SELECT = 'select', // The light is performing one breathe cycle
  LSELECT = 'lselect', // The light is performing breathe cycles for 15 seconds or until an "alert": "none" command is received
}

export interface HueLight {
  id: string
  state: HueLightState
  swupdate: {
    state: string
    lastinstall: string
  }
  type: string
  name: string
  modelid: string
  manufacturername: string
  productname: string
  capabilities: {
    certified: boolean
    control: any
    streaming: any
  }
  config: {
    archetype: string
    function: string
    difrection: string
    startup: any
  }
  uniqueid: string
  swversion: string
  swconfigid: string
  productid: string
}
