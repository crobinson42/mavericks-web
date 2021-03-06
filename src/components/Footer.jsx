import React from "react"
import { injectState } from "freactal"

import firebase from "db/firebase"

import AdminLogin from "components/Modals/AdminLogin"

import "./Footer.css"

class Footer extends React.Component {
  state = {
    showAdminLogin: false
  }

  hideAdminLogin = () => {
    this.setState({
      showAdminLogin: false
    })
  }

  showAdminLogin = () => {
    this.setState({
      showAdminLogin: true
    })
  }

  render() {
    const {
      effects: { navToSchedule, signOut, signOutAdmin },
      state: { isAdmin }
    } = this.props

    return <div>
        <div className="footer">
          <div className="row">
            <div className="m-2 mx-auto">
              <a className="curser" onClick={() => {
                  signOut()
                  firebase.auth().signOut()
                }}>
                Sign Out
              </a> | <span className="">
                v{process.env.REACT_APP_VERSION}
              </span> | <span className="admin-login-button curser" onClick={!isAdmin ? this.showAdminLogin : signOutAdmin}>
                <i className="fa fa-cogs text-muted" /> Barber
              </span>
              {isAdmin && <React.Fragment>
                  {" "}
                  | <span className="admin-login-button curser" onClick={() => navToSchedule(true)}>
                    <i className="fa fa-calendar text-muted" /> Schedule
                  </span>
                </React.Fragment>}
            </div>
          </div>
        </div>

        {this.state.showAdminLogin && <AdminLogin closeHandler={this.hideAdminLogin} />}
      </div>
  }
}

export default injectState(Footer)
