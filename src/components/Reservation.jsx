import React from 'react'
import { injectState } from 'freactal'

import AvailableReservation from './AvailableReservation'
import ReservationName from './ReservationName'

const Reservation = ({ reservation, state, stylist, time }) => {
  const appointments = (state.appointments && state.appointments[stylist]) || {}

  return (
    <div className="align-items-center d-flex flex-column justify-content-center reservation">
      {appointments[time] ? (
        <ReservationName stylist={stylist} time={time} userId={appointments[time]} />
      ) : (
        <AvailableReservation stylist={stylist} time={time} />
      )}
    </div>
  )
}

export default injectState(Reservation)
