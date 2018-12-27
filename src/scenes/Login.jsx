/* global window, $ */
import React, { Component } from "react"
import { injectState } from "freactal"
import Loading from "react-loading"
import firebase from "db/firebase"

import "./Login.css"
import logo from "images/logo.png"
import GoogleMapIcon from "images/google-maps.png"

class Login extends Component {
  static propTypes = {}

  state = {
    error: null,
    sendingText: false,
    sentText: false,
    validPhoneInput: false
  }

  componentDidMount() {
    const $telInput = $('[id="phone"]')
    $telInput.mask("(000) 000-0000")

    setTimeout(() => {
      try {
        this.name.focus()
      } catch (e) {
        // mobile safari bug
      }
    }, 1500)
  }

  handleGoogleMapClick = () => {
    const win = window.open('https://goo.gl/maps/WV8JgaYKcKs', '_blank')
    win.focus()
  }

  validatePhoneInput = e => {
    const digits = e.currentTarget.value.replace(/\D+/g, "")
    const valid = digits.length === 10

    if (valid !== this.state.validPhoneInput) {
      this.setState({
        validPhoneInput: valid
      })
    }
  }

  verifyCode = () => {
    this.setState({
      error: null
    })

    const code = this.code.value
    if (!code || code.length < 6) return

    window.confirmationResult.confirm(code).catch(error => {
      this.setState({
        error: "Invalid code"
      })
    })
  }

  verifyPhone = (number = "(208)-874-9204") => {
    this.setState({
      sendingText: true
    })

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("text-me", {
      size: "invisible"
    })

    const usaNumber = `+1${this.phone.value.replace(/\D+/g, "")}`
    const appVerifier = window.recaptchaVerifier
    firebase
      .auth()
      .signInWithPhoneNumber(usaNumber, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult

        this.setState({
          sendingText: false,
          sentText: true,
        })
      })
      .catch(error => {
        // Error; SMS not sent
        console.log("error", error)
        this.setState({
          error: (error && error.message) || "Something went wrong",
          sendingText: false
        })
      })
  }

  renderInputs = () => {
    if (this.state.sentText) {
      return (
        <div>
          <div className="align-items-center d-flex flex-column form-group justify-content-center">
            <label htmlFor="code">
              Enter the code you received in a text message
            </label>

            <input
              autoComplete="off"
              className="form-control code"
              id="code"
              key="code"
              placeholder="XXXXXX"
              ref={el => (this.code = el)}
              tabIndex="3"
              type="tel"
            />

            <small id="help" className="form-text text-warning">
              {this.state.error}
            </small>
          </div>

          <button
            className="border border-white btn btn-block btn-light"
            onClick={this.verifyCode}
          >
            <h3>Verify Code</h3>
          </button>
        </div>
      )
    }

    return (
      <div>
        <div className="align-items-center d-flex flex-column form-group justify-content-center">
          <label htmlFor="phone">
            <h3>Cell Phone</h3>
          </label>

          <input
            autoComplete="off"
            className="form-control phone"
            disabled={this.state.sendingText}
            id="phone"
            key="phone"
            onChange={this.validatePhoneInput}
            placeholder="(208) 640-3381"
            ref={el => (this.phone = el)}
            tabIndex="2"
            type="tel"
          />

          <small id="help" className="form-text text-warning">
            {this.state.error}
          </small>
        </div>

        {this.state.validPhoneInput && (
          <button
            className="border border-white btn btn-block btn-light"
            id="text-me"
            onClick={this.verifyPhone}
          >
            {this.state.sendingText ? (
              <div className="d-flex justify-content-center">
                <Loading color="grey" type="bubbles" />
              </div>
            ) : (
              <h3>Text Me</h3>
            )}
          </button>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="m-5">
        <div className="align-items-center col d-flex flex-column justify-content-center mx-auto my-5 text-center">
          <img
            alt=""
            className="d-inline-flex"
            src={logo}
            style={{ maxWidth: "150px", margin: "1rem" }}
          />

          <div>
            <p>Open Mon-Fri 10-6pm, Sat 10-3pm</p>
            <p>418 E. Lakeside, Coeur d’Alene, Id</p>
          </div>

          <div className="my-2 p-3" style={{ background: 'rgba(255,255,255,0.1)', border: 'solid 3px white', cursor: 'pointer', width: '150px'}} onClick={this.handleGoogleMapClick}>
            <img src={GoogleMapIcon} />
            <h4 className="my-2">Need Directions?</h4>
          </div>

          <div>
            <h3>
              Schedule your haircut, beard trim, or super sweet fade... but
              first, you must verify your digits.
            </h3>
            <i className="far fa-4x fa-clock" />
          </div>
        </div>

        <div className="align-items-center col-md-6 col-lg-4 d-flex flex-column mx-auto my-5">
          {this.renderInputs()}

          <div className="m-5">&nbsp;</div>
          <div className="m-5">&nbsp;</div>
        </div>

        <span
          className="text-small text-muted"
          style={{ bottom: 0, left: 0, position: "fixed" }}
        >
          {process.env.REACT_APP_VERSION}
        </span>
      </div>
    )
  }
}

export default injectState(Login)
