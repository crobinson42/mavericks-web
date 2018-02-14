import React from 'react'
import { injectState } from 'freactal'

import firebase from 'db/firebase'

import AdminLogin from 'components/Modals/AdminLogin'

import './Footer.css'

class Footer extends React.Component {
  state = {
    showAdminLogin: false,
  }

  hideAdminLogin = () => {
    this.setState({
      showAdminLogin: false,
    })
  }

  showAdminLogin = () => {
    this.setState({
      showAdminLogin: true,
    })
  }

  render() {
    const { effects: { signOut } } = this.props

    return (
      <div>
        <div className="footer">
          <div className="row">
            <div className="m-3 mx-auto">
              <a
                className="curser"
                onClick={() => {
                  signOut()
                  firebase.auth().signOut()
                }}
              >
                Sign Out
              </a>
              {' '}|{' '}
              <span className="">{process.env.REACT_APP_VERSION}</span>
              {' '}|{' '}
              <span className="admin-login-button curser" onClick={this.showAdminLogin}>
              <i className="fa fa-cogs text-muted" /> Barber
            </span>
            </div>
          </div>
        </div>

        {this.state.showAdminLogin && <AdminLogin closeHandler={this.hideAdminLogin} />}
      </div>
    )
  }
}

export default injectState(Footer)
