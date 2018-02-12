import React, { Component } from 'react'

class CustomerAppointment extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="close" data-dismiss="modal" onClick={this.props.closeHandler}>
                  <i className="fa fa-1x fa-window-close"></i>
                </button>
              </div>

              <div className="modal-body text-center">
                <button className="btn btn-warning" onClick={this.props.deleteReservation}>
                  Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overlay" />
      </div>
    )
  }
}

export default CustomerAppointment
