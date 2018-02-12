import React, { Component } from 'react'
import { injectState } from 'freactal'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'

import { providers } from 'db/firebase'
import firebase from 'db/firebase'

import logo from 'images/logo.png'

class Login extends Component {
  static propTypes = {}

  handleSignIn = provider => () => {
    this.props.effects.setLoading()

    firebase.auth().signInWithPopup(providers[provider])
  }

  render() {
    return (
      <div className="m-5">
        <div className="col mx-auto my-5 text-center">
          <img
            alt=""
            className="d-inline-flex"
            src={logo}
            style={{ maxWidth: '150px', margin: '1rem' }}
          />

          <div>
            <p>Open Mon-Fri 9-6pm, Sat 9-5pm</p>
            <p>418 E. Lakeside, Coeur d’Alene, Id</p>
          </div>

          <div>
            <h3>
              Schedule your haircut, beard trim, or super sweet fade... but
              first, you must sign-in.
            </h3>
            <i className="far fa-4x fa-clock" />
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mx-auto my-5">
          <FacebookLoginButton
            text="Login with Facebook"
            onClick={this.handleSignIn('facebook')}
          />
        </div>

        <div className="col-md-6 col-lg-4 mx-auto my-5">
          <GoogleLoginButton
            text="Login with Google"
            onClick={this.handleSignIn('google')}
          />
        </div>

        <span className="text-small text-muted" style={{ bottom: 0, left: 0, position: 'fixed' }}>
          {process.env.REACT_APP_VERSION}
        </span>
      </div>
    )
  }
}

export default injectState(Login)
