import React from "react"
import { startCase } from "lodash-es"
import { injectState } from "freactal"

import { getDayOfWeek } from "utils/date"

const PickStylist = ({ effects, state }) => {
  if (!state.availability) return null

  return (
    <div className="h-100">
      <div className="d-flex flex-column justify-content-center h-100">
        <h2 className="mb-5 text-center w-100">
          Pick a Barber
        </h2>

        <div className="d-flex flex-column justify-content-around h-100" style={{ maxHeight: '300px', zIndex: 9 }}>
          {Object.keys(state.availability).map(stylist => {
            const stylistToday =
              state.availability[stylist][getDayOfWeek(state.date)] || {}
            const isAvailableToday = Boolean(stylistToday.start && stylistToday.end)

            return (
              <button
                className="btn btn-lg btn-outline-secondary py-4 mx-1"
                disabled={!isAvailableToday}
                key={`${stylist}-stylist-picker`}
                onClick={() => effects.setStylist(stylist)}
                style={{ border: 'solid white 1px', color: 'white' }}
              >
                {startCase(stylist)}
                {!isAvailableToday && <div><small className="text-muted"></small>Not Available Today</div>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default injectState(PickStylist)
