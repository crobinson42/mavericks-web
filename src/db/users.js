/**
 * users stores the users registered in the system.
 * When a users logs in with Google or Facebook we
 * use oAuth provider data to set this info in our DB.
 *
 */

import { db } from 'db/firebase'
import DB_REF_PATHS from 'db/db_ref_paths'

export function fetchAndStreamUserById(userId, dataStreamHandler) {
  if (!dataStreamHandler) throw new Error('fetchAndStreamUserById requires a handler')

  const ref = db.ref(`${DB_REF_PATHS.users}${userId}`)

  ref.on('value', snapshot => dataStreamHandler(snapshot.val()))
}

export function writeUser({ email, id, name, phone }) {
  db
    .ref(`${DB_REF_PATHS.users}${id}/`)
    .set({
      email,
      id,
      name,
      phone,
    })
}
