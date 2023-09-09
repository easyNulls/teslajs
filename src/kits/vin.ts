import { VehicleData, OrNullable } from '@/typings.d'

export const vinDecode = (vin: string) => {
  const result = {
    carType: 'Model S',
    awd: false,
    year: 2012
  }

  if (!vin) return result
  var dateCode = vin.charCodeAt(9)
  result.year = 2010 + dateCode - 'A'.charCodeAt(0)
  // handle the skipped 'I' code. We may also need to skip 'O'
  if (dateCode > 73) --result.year

  var model = vin.charAt(3)
  switch (model) {
    case 'S':
      result.carType = 'Model S'
      break
    case '3':
      result.carType = 'Model 3'
      break
    case 'X':
      result.carType = 'Model X'
      break
    case 'Y':
      result.carType = 'Model Y'
      break
    case 'R':
      result.carType = 'Roadster'
      break
  }
  if (
    vin.charAt(7) == '2' || // Dual Motor (standard) (Designated for Model S & Model X)
    vin.charAt(7) == '4' || // Dual Motor (performance) (Designated for Model S & Model X)
    vin.charAt(7) == 'B' || // Dual motor - standard Model 3
    vin.charAt(7) == 'C' || // Dual motor - performance Model 3
    vin.charAt(7) == 'E' // Dual motor - Model Y
  )
    result.awd = true

  return result
}

export const getVin = (vehicle: OrNullable<VehicleData>) => {
  if (!vehicle || !vehicle.vin) throw new Error('invalid parameter')

  return vehicle.vin
}
export const getShortVin = (vehicle: OrNullable<VehicleData>) => {
  if (!vehicle || !vehicle.vin) throw new Error('invalid parameter')
  return vehicle.vin.substring(11)
}
