/**
 * stylist_availability stores the "normal" working schedule
 * for each stylist. The expected data shape in the db, ie:
 *
 * Each stylist's name holds an object we refer to as "availabilityObject"
 * that has keys for day of week which have keys for "start" and "end" time.
 * If a day of week doesn't exist or is null, there is no availability, ie:
 * the stylist is off that day.
 *
 * stylist_availability = {
 *    // stylist name
 *    mike: {
 *      // 1-7 1=monday 7=sunday
 *      1: {
 *        // start hour is the first appt time available
 *        start: 10,
 *        // end hour means nothing will be scheduled on or after end time
 *        end: 18,
 *      },
 *      2: { ... },
 *      ...
 *    }
 * }
 */

import { db } from 'db/firebase'
import DB_REF_PATH from './db_ref_paths'

export function fetchAndStreamAvailability(dataStreamHandler) {
  if (!dataStreamHandler) throw new Error('fetchAndStreamAvailability requires a handler')

  db.ref(DB_REF_PATH.stylistAvailability).on('value', snapshot => dataStreamHandler(snapshot.val()))
}

export function writeAvailability({ availabilityObject = {}, stylist }) {
  if (!stylist) throw new Error('writeAvailability required params not met')

  db
    .ref(`${DB_REF_PATH.stylistAvailability}${stylist}`)
    .set(availabilityObject)
}