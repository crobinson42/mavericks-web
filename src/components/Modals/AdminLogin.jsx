import React, { Component } from 'react'
import { injectState } from 'freactal'

class AdminLogin extends Component {
  checkPassword = e => {
    if (e.target.value !== 'iforgotthepassword') return

    this.props.effects.setAdmin()
    this.props.closeHandler()
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                Where The Barber Logs In...
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={this.props.closeHandler}
                >
                  <i className="fa fa-1x fa-window-close" />
                </button>
              </div>

              <div className="modal-body text-center">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Super Secret Password"
                  onKeyUp={this.checkPassword}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overlay" />
      </div>
    )
  }
}

export default injectState(AdminLogin)
