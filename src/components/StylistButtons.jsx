import React from 'react'
import PropTypes from 'prop-types'
import { injectState } from 'freactal'
import { compose } from 'recompose'

import './StylistButtons.css'

const StylistButtons = ({ active, changeStylist }) => (
  <div className="row justify-content-center mb-5 w-100">
    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 mr-0 pr-0">
      <div
        className={`btn-stylist ${active === 'mike' && 'active'}`}
        onClick={() => changeStylist('mike')}
      >
        Mike
      </div>
    </div>

    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 ml-0 pl-0">
      <div
        className={`btn-stylist ${active === 'sadie' && 'active'}`}
        onClick={() => changeStylist('sadie')}
      >
        Sadie
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
