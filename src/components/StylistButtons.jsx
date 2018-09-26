import React from "react"
import PropTypes from "prop-types"
import { injectState } from "freactal"
import { compose } from "recompose"
import { startCase } from "lodash-es"

import { getDayOfWeek } from "utils/date"

import "./StylistButtons.css"

const StylistButtons = ({ active, changeStylist, state  }) => {
  if (!state.availability || !Object.keys(state.availability || {}).length) return null

  return (
    <div className="d-inline-flex justify-content-center mb-3 w-100">
      {Object.keys(state.availability || {}).map(stylistName => {
        const stylistToday =
          state.availability[stylistName][getDayOfWeek(state.date)] || {}
        const isAvailableToday = Boolean(stylistToday.start && stylistToday.end)

        if (!isAvailableToday) return null

        return (
          <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 m-0 p-0">
            <div
              className={`btn btn-stylist ${state.active === stylistName &&
                "active"}`}
              onClick={() => changeStylist(stylistName)}
            >
              {startCase(stylistName)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

StylistButtons.propTypes = {
  active: PropTypes.string.isRequired,
  effects: PropTypes.object.isRequired,
  changeStylist: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

const enhance = compose(injectState)

export default enhance(StylistButtons)
