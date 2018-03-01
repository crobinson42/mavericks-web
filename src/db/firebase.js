import * as firebase from 'firebase'
import { writeUser } from './users'

const config = {
  apiKey: 'AIzaSyAdc0MpzD9C1rWUFqnb4WhGWQ2bdFJGEuo',
  authDomain: 'mavericks-mens-hair.firebaseapp.com',
  databaseURL: 'https://mavericks-mens-hair.firebaseio.com',
  storageBucket: 'mavericks-mens-hair.appspot.com',
}

firebase.initializeApp(config)
firebase.storage()
firebase.database()

window.firebase = firebase

export const db = firebase.database()

export const handleAuthentication = authStateChangedHandler => {
  firebase.auth().getRedirectResult().then((result) => {
    if (result.user)
      authStateChangedHandler(result.user)
  })

  firebase.auth().onAuthStateChanged(user => {
    if (user)
      authStateChangedHandler(user)
  })
}

export const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
}

/**
 * This listener is responsible for adding users
 * to the users db when someone authenticates.
 */
firebase.auth().onAuthStateChanged(user => {
  if (!user) return

  writeUser({
    email: user.email,
    id: user.uid,
    name: user.displayName,
    phone: user.phoneNumber,
  })
})

export default firebase
