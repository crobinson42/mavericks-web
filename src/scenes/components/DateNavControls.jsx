import React, { Component } from "react"
import { injectState } from "freactal"
// import PropTypes from 'prop-types'

import Pagination from "components/Pagination"

class DateNavControls extends Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  handlePaginationNext = () => {
    this.props.effects.changeDateNext()
  }

  handlePaginationPrevious  = () => {
    this.props.effects.changeDatePrevious()
  }

  render() {
    if (!this.props.state.isAdmin) return null

    return (
      <div className="p-3 position-fixed w-100">
        <Pagination
          canNavNext
          canNavPrevious
          handleNext={this.handlePaginationNext}
          handlePrevious={this.handlePaginationPrevious}
        />
      </div>
    )
  }
}

export default injectState(DateNavControls)
