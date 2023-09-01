declare module 'cie-rgb-color-converter' {
  export default class ColorConverter {
    static rgbToXy(red: number, green: number, blue: number, modelId: null | string): { x: number; y: number }
  }
}
