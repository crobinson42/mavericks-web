import React from 'react'
import { injectState } from 'freactal'

import { getDayOfWeek } from 'utils/date'

import Lodable from 'react-loading-overlay'
import Footer from 'components/Footer'
import logo from 'images/logo.png'
import StylistButtons from 'components/StylistButtons'
import TimeSlots from 'components/TimeSlots'

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
    if (this.state.loading)
      return <Lodable active spinner text="Updating..." />
    
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

    return (
      <div className="scene-container d-flex flex-column">
        <div className="">
          <div className="col-md-6 mx-auto text-center">
            <img
              alt=""
              className="d-inline-flex"
              src={logo}
              style={{ maxWidth: '120px', margin: '1rem' }}
            />
            <h1 className="d-inline-flex">Maverick's</h1>
          </div>
        </div>

        <div className="">
          <StylistButtons
            active={this.state.active}
            changeStylist={stylist => this.setState({ active: stylist })}
          />
        </div>

        <div className="schedule">
          <div className="col-11 offset-xs-1 col-sm-8 col-md-6 col-lg-5 offset-md-2 mx-auto">
            <TimeSlots
              appointments={appointments}
              end={availabilityEnd}
              stylist={this.state.active}
              start={availabilityStart}
            />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default injectState(Customer)
