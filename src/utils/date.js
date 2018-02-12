import { DateTime } from 'luxon'

// 1 is monday 7 is sunday
export function getDayOfWeek() {
  return UDT().toFormat('c')
}

// return todays date, 20180208 = YYYYMMDD
export function getYearMonthDay() {
  return UDT().toFormat('yLLdd')
}

// the timezone for the store
export const storeTZ = 'America/Los_Angeles'

// universal date time object
export function UDT() {
  return DateTime.local().setZone(storeTZ)
}
