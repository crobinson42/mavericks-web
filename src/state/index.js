import { getDayOfWeek, getYearMonthDay } from "../utils/date"

import pckg from "../../package.json"

export default {
  initialState: () => {
    let LS
    try {
      LS = localStorage.getItem("mavcuts")
      if (LS) LS = JSON.parse(LS)
    } catch (e) {
      console.error("LocalStorage.getItem error", e)
    }

    if (LS && LS.version && LS.version === pckg.version) return LS

    return {
      // appts for todays date
      appointments: null,
      // user signed in
      authenticated: false,
      // firebase auth in-progress
      authenticationLoading: true,
      // availability
      availability: null,
      active: "mike",
      date: getYearMonthDay(),
      dayOfWeek: getDayOfWeek(),
      // if the current user is in admin mode
      isAdmin: false,
      // initial app state while fetching data
      loading: true,
      // keep login state here so when reopening window up they can input a txt msg code
      sentText: false,
      // current user
      user: null,
      // because we persist state in localStorage we need to match versions in case of breaking changes
      version: pckg.version,
    }
  },
  effects: {
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
      availability
    }),
    setDate: (effects, date) => state => ({ ...state, date }),
    setLoading: (effects, loading = true) => state => ({ ...state, loading }),
    setName: (effects, name) => state => ({ ...state, name }),
    setStylist: (effects, active = "mike") => state => ({ ...state, active }),
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
    })
  }
}
