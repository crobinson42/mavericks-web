import React from 'react'
import { injectState } from 'freactal'

import { getDayOfWeek } from 'utils/date'

import Lodable from 'react-loading-overlay'
import Footer from 'components/Footer'
import logo from 'images/logo.png'
import StylistButtons from 'components/StylistButtons'
import TimeSlots from 'components/TimeSlots'
import { UDT } from 'utils/date'

import './Customer.css'

class Customer extends React.Component {
  state = {
    active: 'mike',
    loading: false,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ loading: false }), 1000)
    }, 15 * 60000)
  }

  render() {
    if (this.state.loading) return <Lodable active spinner text="Updating..." />

    const appointments =
      this.props.state.appointments &&
      this.props.state.appointments[this.state.active]

    let stylistAvailability =
      this.props.state.availability &&
      this.props.state.availability[this.state.active]
    stylistAvailability =
      (stylistAvailability && stylistAvailability[getDayOfWeek()]) || {}
    const availabilityEnd = stylistAvailability.end
    const availabilityStart = stylistAvailability.start

    const humanDate = UDT(this.props.state.date).toFormat('cccc LLL d')

    return (
      <div className="scene-container d-flex flex-column">
        <div className="mx-auto text-center">
          <div className="logo-container">
            <img
              alt=""
              src={logo}
              style={{ maxHeight: '100px', marginTop: '.5rem' }}
            />
          </div>

          <span>
            <div className="brand-name">Maverick's</div>
            <div className="text-small text-muted">
              <em>
                Claim the chair for today,
                {' '}
                {humanDate}
              </em>
            </div>
          </span>
        </div>

        <div className="">
          <StylistButtons
            active={this.state.active}
            changeStylist={stylist => this.setState({ active: stylist })}
          />
        </div>

        <div className="schedule mx-auto">
          <TimeSlots
            appointments={appointments}
            end={availabilityEnd}
            stylist={this.state.active}
            start={availabilityStart}
          />
        </div>

        <Footer />
      </div>
    )
  }
}

export default injectState(Customer)
