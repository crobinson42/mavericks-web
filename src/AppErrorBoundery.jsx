import React, { Component } from "react"

import firebase from "db/firebase"

class AppErrorBoundery extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    window.Raven.captureException(error, { extra: errorInfo })

    // we want to kill a user session if they catch so they can re-auth
    setTimeout(() => {
      firebase.auth().signOut()
    }, 2000)

    if (confirm('The was some kind of error, do you want to reload?')) {
      window.location.reload()
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <div
            className="row my-5 text-danger"
            onClick={() =>
              window.Raven.lastEventId() && window.Raven.showReportDialog()
            }
          >
            <p className="m-3">We're sorry — something's gone wrong.</p>
            <p className="m-3">
              Our team has been notified, but click here fill out a report.
            </p>
          </div>

          <div className="row">
            <p className="btn btn-primary m-5">
              <button onClick={() => window.location.reload()}>Reload</button>
            </p>
          </div>
        </div>
      )
    } else {
      //when there's not an error, render children untouched
      return this.props.children
    }
  }
}

export default AppErrorBoundery
