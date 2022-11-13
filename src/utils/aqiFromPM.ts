/* How to calculate AQI - https://community.purpleair.com/t/how-to-calculate-the-us-epa-pm2-5-aqi/877
                                    AQI         RAW PM2.5
  Good                               0 - 50   |   0.0 – 12.0
  Moderate                          51 - 100  |  12.1 – 35.4
  Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
  Unhealthy                        151 – 200  |  55.5 – 150.4
  Very Unhealthy                   201 – 300  |  150.5 – 250.4
  Hazardous                        301 – 400  |  250.5 – 350.4
  Hazardous                        401 – 500  |  350.5 – 500.4
*/
export const aqiFromPM = (pm: number) => {
  if (isNaN(pm)) return '-'
  if (pm == undefined) return '-'
  if (pm < 0) return pm
  if (pm > 1000) return '-'

  if (pm > 350.5) {
    return calcAQI(pm, 500, 401, 500.4, 350.5) //Hazardous
  } else if (pm > 250.5) {
    return calcAQI(pm, 400, 301, 350.4, 250.5) //Hazardous
  } else if (pm > 150.5) {
    return calcAQI(pm, 300, 201, 250.4, 150.5) //Very Unhealthy
  } else if (pm > 55.5) {
    return calcAQI(pm, 200, 151, 150.4, 55.5) //Unhealthy
  } else if (pm > 35.5) {
    return calcAQI(pm, 150, 101, 55.4, 35.5) //Unhealthy for Sensitive Groups
  } else if (pm > 12.1) {
    return calcAQI(pm, 100, 51, 35.4, 12.1) //Moderate
  } else if (pm >= 0) {
    return calcAQI(pm, 50, 0, 12, 0) //Good
  } else {
    return undefined
  }
}

function calcAQI(Cp: number, Ih: number, Il: number, BPh: number, BPl: number) {
  var a = Ih - Il
  var b = BPh - BPl
  var c = Cp - BPl
  return Math.round((a / b) * c + Il)
}
