import React from 'react'
import { injectState } from 'freactal'

import { setAppointment } from 'db/appointments'

const setAppointmentHandler = params => {
  setAppointment(params)
  window.swal("Nice! See you then.")
  window.gtag('event', 'reservation set', {
    event_category: 'reservations',
  })
}

const AvailableReservation = ({ state, stylist, time }) => {
  return (
    <div className="text-center w-100">
      <span
        className={`curser ${state.isAdmin ? '' : 'text-muted'}`}
        onClick={() =>
          state.isAdmin
            ? setAppointmentHandler({ stylist, time, userId: state.user.id })
            : setAppointmentHandler({ stylist, time, userId: state.user.id })
        }
      >
        {state.isAdmin ? '' : 'Available...'}
      </span>
    </div>
  )
}

export default injectState(AvailableReservation)
