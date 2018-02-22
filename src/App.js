import React, { Component } from 'react'
import { injectState, provideState } from 'freactal'
import { compose } from 'recompose'
import Loadable from 'react-loading-overlay'
import initReactFastclick from 'react-fastclick'
import { detect } from 'detect-browser'

import { handleAuthentication } from './db/firebase'
import { fetchAndStreamAppointments } from 'db/appointments'
import { fetchAndStreamAvailability } from 'db/stylist_availability'
import state from 'state'

import Scene from 'scenes'

import './App.css'

initReactFastclick()

const browser = detect()

switch (browser && browser.name) {
  case 'ie':
  case 'opera':
    alert(
      'Sorry, you need to use a supported browser. Use Firefox, Safari, or Chrome',
    )
    break
  default:
    console.info('browser:', browser.name)
}

class App extends Component {
  componentDidMount() {
    handleAuthentication(this.authStateChangeHandler)
  }

  authStateChangeHandler = user => {
    this.props.effects.setAuthenticationLoading(false)

    if (!user) {
      return this.props.effects.setLoading(false)
    }

    this.props.effects.setUser({
      email: user.email,
      id: user.uid,
      name: user.displayName,
      phone: user.phoneNumber,
    })

    fetchAndStreamAppointments(this.appointmentsStreamHandler)
    fetchAndStreamAvailability(this.availabilityStreamHandler)
  }

  appointmentsStreamHandler = appts => {
    this.props.effects.setAppointments(appts)
  }

  availabilityStreamHandler = availability => {
    // The first availability response from the stream
    // will remove loading state on the component
    if (this.props.state.loading) this.props.effects.setLoading(false)

    this.props.effects.setAvailability(availability)
  }

  render() {
    if (this.props.state.authenticationLoading)
      return <Loadable active spinner text="Checking who you are..." />
    else if (this.props.state.loading)
      return <Loadable active spinner text="Hang tight..." />
    else if (this.props.state.authenticated) return <Scene.Customer />

    return <Scene.Login />
  }
}

const enhance = compose(provideState(state), injectState)

export default enhance(App)
