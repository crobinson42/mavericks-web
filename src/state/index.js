import { getDayOfWeek, getYearMonthDay } from '../utils/date'

export default {
  initialState: () => ({
    // appts for todays date
    appointments: null,
    // user signed in
    authenticated: false,
    // firebase auth in-progress
    authenticationLoading: true,
    // availability object for day of week in DB
    availability: null,
    active: 'mike',
    date: getYearMonthDay(),
    dayOfWeek: getDayOfWeek(),
    // if the current user is in admin mode
    isAdmin: false,
    // initial app state while fetching data
    loading: true,
    // current user
    user: null,
  }),
  effects: {
    setAdmin: (effects) => state => ({
      ...state,
      isAdmin: true,
    }),
    setAppointments: (effects, appointments) => state => ({
      ...state,
      appointments,
    }),
    setAuthenticationLoading: (
      effects,
      authenticationLoading = true,
    ) => state => ({ ...state, authenticationLoading }),
    setAvailability: (effects, availability) => state => ({
      ...state,
      availability,
    }),
    setDate: (effects, date) => state => ({ ...state, date }),
    setLoading: (effects, loading = true) => state => ({ ...state, loading }),
    setStylist: (effects, active = 'mike') => state => ({ ...state, active }),
    setUser: (effects, user) => state => {
      effects.setAuthenticationLoading(false)

      return {
        ...state,
        authenticated: true,
        user,
      }
    },
    signOut: effects => state => ({
      ...state,
      authenticated: false,
      user: null,
    }),
  },
}
