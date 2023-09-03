export enum AQI_COLORS {
  Green,
  Yellow,
  Orange,
  Red,
  Purple,
  Maroon,
  Error,
}

export interface RBGColor {
  r: number
  g: number
  b: number
}
interface CMYKColor {
  c: number
  m: number
  y: number
  k: number
}

interface CIEColor {
  x: number
  y: number
}

export interface ColorValues {
  rgb: RBGColor
  cmyk?: CMYKColor
  xy?: CIEColor
}

interface AQIColorValues {
  [AQI_COLORS.Green]: ColorValues
  [AQI_COLORS.Yellow]: ColorValues
  [AQI_COLORS.Orange]: ColorValues
  [AQI_COLORS.Red]: ColorValues
  [AQI_COLORS.Purple]: ColorValues
  [AQI_COLORS.Maroon]: ColorValues
  [AQI_COLORS.Error]: ColorValues
}

export const AQI_COLOR_VALUES: AQIColorValues = {
  [AQI_COLORS.Green]: {
    rgb: { r: 0, g: 228, b: 0 },
    cmyk: { c: 40, m: 0, y: 100, k: 0 },
    xy: { x: 0.2774, y: 0.6924 },
  },
  [AQI_COLORS.Yellow]: {
    rgb: { r: 255, g: 255, b: 0 },
    cmyk: { c: 0, m: 0, y: 100, k: 0 },
    xy: { x: 0.441, y: 0.5331 },
  },
  [AQI_COLORS.Orange]: {
    rgb: { r: 255, g: 126, b: 0 },
    cmyk: { c: 0, m: 52, y: 100, k: 0 },
    xy: { x: 0.5404, y: 0.4369 },
  },
  [AQI_COLORS.Red]: {
    rgb: { r: 255, g: 0, b: 0 },
    cmyk: { c: 0, m: 100, y: 100, k: 0 },
    xy: { x: 0.6522, y: 0.3335 },
  },
  [AQI_COLORS.Purple]: {
    rgb: { r: 143, g: 63, b: 151 },
    cmyk: { c: 51, m: 89, y: 0, k: 0 },
    xy: { x: 0.6905, y: 0.2776 },
  },
  [AQI_COLORS.Maroon]: {
    rgb: { r: 126, g: 0, b: 35 },
    cmyk: { c: 30, m: 100, y: 100, k: 30 },
    xy: { x: 0.5052, y: 0.1835 },
  },
  [AQI_COLORS.Error]: {
    rgb: { r: 0, g: 0, b: 255 },
    cmyk: { c: 100, m: 100, y: 0, k: 0 },
    xy: { x: 0.1014, y: 0.1504 },
  },
}
