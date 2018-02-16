import React from 'react'
import { injectState } from 'freactal'

import { setAppointment } from 'db/appointments'

const AvailableReservation = ({ state, stylist, time }) => {
  return (
    <div className="text-center w-100">
      <span
        className={`curser ${state.isAdmin ? '' : 'text-muted'}`}
        onClick={() =>
          state.isAdmin
            ? setAppointment({ stylist, time, userId: state.user.id })
            : setAppointment({ stylist, time, userId: state.user.id })
        }
      >
        {
          state.isAdmin
            ? ''
            : 'Available...'
        }
      </span>
    </div>
  )
}

export default injectState(AvailableReservation)
