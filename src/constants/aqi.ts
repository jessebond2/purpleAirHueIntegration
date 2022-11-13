export enum AQI_COLORS {
  Green,
  Yellow,
  Orange,
  Red,
  Purple,
  Maroon,
}

interface RBGColor {
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

interface AQIColorValues {
  [AQI_COLORS.Green]: { rgb: RBGColor; cmyk: CMYKColor }
  [AQI_COLORS.Yellow]: { rgb: RBGColor; cmyk: CMYKColor }
  [AQI_COLORS.Orange]: { rgb: RBGColor; cmyk: CMYKColor }
  [AQI_COLORS.Red]: { rgb: RBGColor; cmyk: CMYKColor }
  [AQI_COLORS.Purple]: { rgb: RBGColor; cmyk: CMYKColor }
  [AQI_COLORS.Maroon]: { rgb: RBGColor; cmyk: CMYKColor }
}

export const AQI_COLOR_VALUES: AQIColorValues = {
  [AQI_COLORS.Green]: {
    rgb: { r: 0, g: 228, b: 0 },
    cmyk: { c: 40, m: 0, y: 100, k: 0 },
  },
  [AQI_COLORS.Yellow]: {
    rgb: { r: 255, g: 255, b: 0 },
    cmyk: { c: 0, m: 0, y: 100, k: 0 },
  },
  [AQI_COLORS.Orange]: {
    rgb: { r: 255, g: 126, b: 0 },
    cmyk: { c: 0, m: 52, y: 100, k: 0 },
  },
  [AQI_COLORS.Red]: {
    rgb: { r: 255, g: 0, b: 0 },
    cmyk: { c: 0, m: 100, y: 100, k: 0 },
  },
  [AQI_COLORS.Purple]: {
    rgb: { r: 143, g: 63, b: 151 },
    cmyk: { c: 51, m: 89, y: 0, k: 0 },
  },
  [AQI_COLORS.Maroon]: {
    rgb: { r: 126, g: 0, b: 35 },
    cmyk: { c: 30, m: 100, y: 100, k: 30 },
  },
}
