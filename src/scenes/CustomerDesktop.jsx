import React from "react"
import { injectState } from "freactal"
import { startCase } from 'lodash-es'
import { getDayOfWeek } from "utils/date"

import Lodable from "react-loading-overlay"
import Footer from "components/Footer"
import logo from "images/logo.png"

import TimeSlots from "components/TimeSlots"
import { UDT } from "utils/date"

import "./Customer.css"

class CustomerDesktop extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ loading: false }), 1000)
    }, 15 * 60000)
  }

  render() {
    if (this.state.loading) return <Lodable active spinner text="Updating..." />
    const humanDate = UDT(this.props.state.date).toFormat("cccc LLL d")

    return (
      <div className="scene-container d-flex flex-column">
        <div className="mx-auto text-center">
          <div className="logo-container">
            <img
              alt=""
              src={logo}
              style={{ maxHeight: "100px", marginTop: ".5rem" }}
            />
          </div>

          <span>
            <div className="brand-name">Maverick's</div>
            <div className="text-small text-muted">
              <em>Appointments for {humanDate}</em>
            </div>
          </span>
        </div>

        <div className="d-flex">
          {Object.keys(this.props.state.availability).map(stylist => {
              const appointments =
                this.props.state.appointments &&
                this.props.state.appointments[stylist]

              let stylistAvailability =
                this.props.state.availability &&
                this.props.state.availability[stylist]
              stylistAvailability =
                (stylistAvailability && stylistAvailability[getDayOfWeek()]) || {}
              const availabilityEnd = stylistAvailability.end
              const availabilityStart = stylistAvailability.start

              return (
                <div className="schedule mx-auto" key={stylist}>
                  <div className="d-flex justify-content-center">
                    <h3>{startCase(stylist)}</h3>
                  </div>

                  <TimeSlots
                    appointments={appointments}
                    end={availabilityEnd}
                    stylist={stylist}
                    start={availabilityStart}
                  />
                </div>
              )
            })
          }
        </div>

        <Footer />
      </div>
    )
  }
}

export default injectState(CustomerDesktop)
