import React from 'react'
import { injectState } from 'freactal'

import { removeAppointment } from 'db/appointments'
import { fetchAndStreamUserById } from 'db/users'

import CustomerAppointment from 'components/Modals/CustomerAppointment'

class ReservationName extends React.Component {
  state = {
    email: '',
    id: null,
    isThisUser: false,
    name: '',
    phone: '',
    showReservationModal: false,
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

    this.setState({
      showReservationModal: true,
    })
  }

  closeReservationModal = e => {
    this.setState({
      showReservationModal: false,
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

            {this.props.state.isAdmin && <div>{this.state.phone || this.state.email}</div>}
          </div>
        </div>

        {this.state.showReservationModal &&
          (this.props.state.isAdmin || this.state.isThisUser) && (
            <CustomerAppointment
              closeHandler={this.closeReservationModal}
              deleteReservation={this.deleteReservation}
            />
          )}
      </div>
    )
  }
}

export default injectState(ReservationName)
