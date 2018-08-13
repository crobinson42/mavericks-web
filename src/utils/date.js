// @flow
import { DateTime } from 'luxon'

const LUXON_DATE_FORMAT = 'yLLdd'

// 1 is monday 7 is sunday
export function getDayOfWeek(date) {
  return UDT(date).toFormat('c')
}

// return todays date, 20180208 = YYYYMMDD
export function getYearMonthDay() {
  return UDT().toFormat(LUXON_DATE_FORMAT)
}

export function nextDayFromDate(date) {
  try {
    return DateTime.fromFormat(date, LUXON_DATE_FORMAT).plus({days: 1}).toFormat(LUXON_DATE_FORMAT)
  } catch (e) {
    console.warn('nextDayFromDate', date)
  }
}

export function previousDayFromDate(date) {
  try {
    return DateTime.fromFormat(date, LUXON_DATE_FORMAT).minus({days: 1}).toFormat(LUXON_DATE_FORMAT)
  } catch(e) {
    console.warn('previousDayFromDate', date)
  }
}

window.dt = DateTime

// the timezone for the store
export const storeTZ = 'America/Los_Angeles'

// universal date time object
export function UDT(date) {

  if (date) {
    try {
      return DateTime.fromFormat(date, LUXON_DATE_FORMAT).setZone(storeTZ)
    } catch (e) {
      console.warn('UDT(date)', date)
    }
  }

  return DateTime.local().setZone(storeTZ)
}
