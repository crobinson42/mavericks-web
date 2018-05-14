import React from 'react'
import PropTypes from 'prop-types'
import { injectState } from 'freactal'
import { compose } from 'recompose'

import './StylistButtons.css'

const StylistButtons = ({ active, changeStylist }) => (
  <div className="d-inline-flex justify-content-center mb-3 w-100">
    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 m-0 p-0">
      <div
        className={`btn btn-stylist ${active === 'mike' && 'active'}`}
        onClick={() => changeStylist('mike')}
      >
        Mike
      </div>
    </div>

    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 m-0 p-0">
      <div
        className={`btn btn-stylist ${active === 'stephen' && 'active'}`}
        onClick={() => changeStylist('stephen')}
      >
        Stephen
      </div>
    </div>
  </div>
)

StylistButtons.propTypes = {
  effects: PropTypes.shape({
    setStylist: PropTypes.func.isRequired,
  }),
  state: PropTypes.shape({
    active: PropTypes.string.isRequired,
  }),
}

const enhance = compose(injectState)

export default enhance(StylistButtons)
