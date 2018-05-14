import React from 'react'
import { injectState } from 'freactal'

import { setAppointment } from 'db/appointments'

const setAppointmentHandler = params => {
  window.swal("Name for the Appointment?", {
    content: "input",
  }).then((name) => {
    if (!name) return

    setAppointment({ ...params, name })

    window.swal("Nice! See you then, " + name)

    window.gtag('event', 'reservation set', {
      event_category: 'reservations',
    })
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
