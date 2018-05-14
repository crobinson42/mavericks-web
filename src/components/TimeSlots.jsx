import React from 'react'
import { DateTime } from 'luxon'
import { injectState } from 'freactal'

import Loading from 'react-loading'
import Reservation from './Reservation'

import './TimeSlots.css'

class TimeSlots extends React.Component {
  state = {
    hours: [],
    loading: true,
  }

  componentDidMount() {
    this.updateHours()
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.start !== this.props.start || prevProps.end !== this.props.end) {
      this.updateHours()
    }

    if (prevProps.stylist !== this.props.stylist) {
      this.setState({
        loading: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            loading: false,
          })
        }, 820)
      })
    }
  }

  updateHours = () => {
    const { end, start } = this.props


    // no hours
    if (!start || !end) return this.setState({ hours: [], loading: false, })

    // create an array of hours
    const hours = new Array(end - start).fill('').map((val, i) => start + i)

      this.setState({
        hours,
        loading: false,
      });
  }

  render() {
    if (this.state.loading)
      return (
        <div className="row d-flex justify-content-center mb-5">
          <Loading color="grey" height={200} type="bubbles" width={200} />
        </div>
      )
    else if (!this.state.hours.length) return <h3 className="text-center m-5">Not in today...</h3>

    return this.state.hours.map(hour => {
      const time = DateTime.fromObject({ hour }).toFormat('h')
      const timeObject = DateTime.fromObject({ hour })
      const timeHalf = DateTime.fromObject({ hour, minutes: 30 }).toFormat('h:mm')
      const timeHalfObject = DateTime.fromObject({ hour, minutes: 30 })

      return (
        <div className="time-block" key={time}>
          <div className="d-flex time-slot-row">
            <div className="time">
              {time}
              <span className="text-muted" style={{ fontSize: '50%' }}>
                {DateTime.fromObject({ hour }).toFormat('a')}
              </span>
            </div>

            <Reservation stylist={this.props.stylist} time={DateTime.fromObject({ hour }).toFormat('h:mm')} timeObject={timeObject} />
          </div>

          <div className="d-flex time-slot-row">
            <div className="time">
              {timeHalf}
            </div>

            <Reservation stylist={this.props.stylist} time={timeHalf} timeObject={timeHalfObject} />
          </div>
        </div>
      )
    })
  }
}

export default injectState(TimeSlots)
