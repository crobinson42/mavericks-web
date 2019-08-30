import { getDayOfWeek, getYearMonthDay,  nextDayFromDate, previousDayFromDate, } from "../utils/date"

import pckg from "../../package.json"

export default {
  initialState: () => {
    let LS

    try {
      LS = JSON.parse(localStorage.getItem('mavcuts-1'))
    } catch (e) {
      console.error('localStorage error with .getItem()', e)
    }

    return {
      // appts for todays date
      appointments: null,
      // user signed in
      authenticated: false,
      // firebase auth in-progress
      authenticationLoading: true,
      // availability
      availability: null,
      active: (LS && LS.active) || null,
      date: getYearMonthDay(),
      dayOfWeek: getDayOfWeek(),
      // if the current user is in admin mode
      isAdmin: false,
      // initial app state while fetching data
      loading: true,
      // keep login state here so when reopening window up they can input a txt msg code
      sentText: false,
      showSchedule: false, // show the schedule scene
      // current user
      user: null,
      // because we persist state in localStorage we need to match versions in case of breaking changes
      version: pckg.version
    }
  },
  effects: {
    changeDatePrevious: effects => state => {
      return ({
        ...state,
        date: previousDayFromDate(state.date),
      })
    },
    changeDateNext: effects => state => ({
      ...state,
      date: nextDayFromDate(state.date),
    }),
    navToSchedule: (effects, goTo = false) => state => ({
      ...state,
      showSchedule: Boolean(goTo),
    }),
    setAdmin: effects => state => ({
      ...state,
      isAdmin: true
    }),
    setAppointments: (effects, appointments) => state => ({
      ...state,
      appointments
    }),
    setAuthenticationLoading: (
      effects,
      authenticationLoading = true
    ) => state => ({ ...state, authenticationLoading }),
    setAvailability: (effects, availability) => state => ({
      ...state,
      // esnure we always have a key=>value Map bcus Firebase quark will give array if we use Int as keys in an object
      availability: Object.entries(availability).reduce((acc, kv) => {
        acc[kv[0]] = Array.isArray(kv[1]) ? kv[1].reduce((acc, v, index) => {
          acc[index] = v

          return acc
        }, {}) : kv[1]

        return acc
      }, {})
    }),
    setDate: (effects, date) => state => ({ ...state, date }),
    setLoading: (effects, loading = true) => state => ({ ...state, loading }),
    setName: (effects, name) => state => ({ ...state, name }),
    setStylist: (effects, active) => state => ({ ...state, active }),
    sentText: (effects, sent = true) => state => ({ ...state, sentText: sent }),
    setUser: (effects, user) => state => {
      return {
        ...state,
        authenticated: true,
        user
      }
    },
    signOut: effects => state => ({
      ...state,
      authenticated: false,
      user: null
    }),
    signOutAdmin: effects => state => ({
      ...state,
      isAdmin: false,
    })
  }
}
