import React from 'react'
import { injectState } from 'freactal'

import AvailableReservation from './AvailableReservation'
import ReservationName from './ReservationName'

import { getYearMonthDay } from 'utils/date'

const Reservation = ({ reservation, state, stylist, time, timeObject }) => {
  const appointments = (state.appointments && state.appointments[stylist]) || {}

  let reservationSlot

  if (appointments[time]) {
    const { name, userId } = appointments[time]

    reservationSlot =
      <ReservationName date={state.date} name={name} stylist={stylist} time={time} timeObject={timeObject} userId={userId}/>
  }
  else if (timeObject.valueOf() > new Date().getTime())
    reservationSlot = <AvailableReservation stylist={stylist} time={time} />
  else if (getYearMonthDay() !== state.date)
    reservationSlot = <AvailableReservation stylist={stylist} time={time} />

  return (
    <div className="align-items-start d-flex flex-column justify-content-center reservation">
      {reservationSlot}
    </div>
  )
}

export default injectState(Reservation)
