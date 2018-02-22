import React from 'react'
import { injectState } from 'freactal'
import swal from 'sweetalert'

import { removeAppointment } from 'db/appointments'
import { fetchAndStreamUserById } from 'db/users'

class ReservationName extends React.Component {
  state = {
    email: '',
    id: null,
    isThisUser: false,
    name: '',
    phone: '',
  }

  componentDidMount() {
    fetchAndStreamUserById(this.props.userId, user => {
      this.setState({
        ...user,
      })
    })

    if (this.props.userId === this.props.state.user.id)
      this.setState({
        isThisUser: true,
      })
  }

  clickHandler = () => {
    if (!this.state.isThisUser && !this.props.state.isAdmin) return null
    // don't let a user see this modal if the appt is in the past
    else if (this.state.isThisUser && this.props.timeObject.valueOf() < new Date().getTime()) return null

    swal({
      buttons: {
        confirm: "I'll be there!",
        cancelAppt: {
          text: "Cancel Appointment",
          value: "cancel",
        },
      },
    }).then(value => {
      switch (value) {
        case 'cancel':
          return this.deleteReservation()
        default:
          return null
      }
    })
  }

  deleteReservation = () => {
    const { stylist, time } = this.props

    removeAppointment({ stylist, time })
  }

  render() {
    const highlightReservation = this.state.isThisUser
      ? 'alert alert-secondary'
      : ''

    if (this.props.userId === null) return <div>unavailable...</div>

    return (
      <div>
        <div
          className={`curser d-flex ${highlightReservation}`}
          onClick={this.clickHandler}
        >
          <div className="d-flex flex-column justify-content-center pr-3">
            {this.state.isThisUser && (
              <i className="fa fa-chevron-circle-right" />
            )}{' '}
          </div>
          <div className="inline">
            <div>{this.state.name}</div>

            {this.props.state.isAdmin && (
              <div>{this.state.phone || this.state.email}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default injectState(ReservationName)
