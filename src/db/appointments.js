/**
 * appts stores the appointments for a stylist.
 * All appts are stored as the date YYYYMMDD with
 * keys for the stylist name and keys with the time (hh:mm).
 * The time keys reference the customer UID under "users" db ref
 * OR a time slot is set to FALSE which means the time slot is
 * unavailable.
 *
 * appts = {
 *    // date - YYYYMMDD
 *    20180209: {
 *      // stylist
 *      mike: {
 *        // time slot
 *        '10:00': $uid // "users" db ref key
 *      }
 *    }
 * }
 */

import { db } from "db/firebase"
import DB_REF_PATHS from "./db_ref_paths"
import { getYearMonthDay } from "utils/date"

export function fetchAndStreamAppointments(
  dataStreamHandler,
  yearMonthDay = getYearMonthDay()
) {
  if (!dataStreamHandler)
    throw new Error("fetchAndStreamAppointments requires a handler")

  // by default only fetch and streams todays date appts
  db
    .ref(`${DB_REF_PATHS.appointments}${yearMonthDay}`)
    .on("value", snapshot => dataStreamHandler(snapshot.val()))
}

export function fetchAndStreamAppointmentByDateBarberTime(
  dataStreamHandler,
  yearMonthDay = getYearMonthDay(),
  stylist,
  time
) {
  if (!dataStreamHandler)
    throw new Error(
      "fetchAndStreamAppointmentByDateBarberTime requires a handler"
    )

  // by default only fetch and streams todays date appts
  db
    .ref(`${DB_REF_PATHS.appointments}${yearMonthDay}/${stylist}/${time}`)
    .on("value", snapshot => dataStreamHandler(snapshot.val()))
}

export function setAppointment({
  date = getYearMonthDay(),
  name,
  stylist,
  time,
  userId
}) {
  if (!date || !name || !stylist || !time)
    throw new Error("writeAppointment required params not met")

  console.log(
    `setAppointment(), ${DB_REF_PATHS.appointments}${date}/${stylist}/${time}`
  )

  db
    .ref(`${DB_REF_PATHS.appointments}${date}/${stylist}/${time}`)
    .set({ userId, name })
}

export function removeAppointment({ date = getYearMonthDay(), stylist, time }) {
  if (!date || !stylist || !time)
    throw new Error("removeAppointment required params not met")

  console.log(
    `removeAppointment(), ${
      DB_REF_PATHS.appointments
    }${date}/${stylist}/${time}`
  )

  db
    .ref(`${DB_REF_PATHS.appointments}${date}/${stylist}/${time}`)
    .remove()
    .catch(err => {
      console.log("err", err)
    })
    .then(data => console.log("delted", data))
}
