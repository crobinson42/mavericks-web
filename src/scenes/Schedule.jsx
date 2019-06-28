import React, { useEffect, useState } from "react"
// import PropTypes from 'prop-types'
import { injectState } from "freactal"
import { cloneDeep, get, set } from "lodash-es"
import { diff } from "deep-object-diff"
import { writeAvailability } from "../db/stylist_availability"

import "./Schedule.css"
import SelectScheduleTime from "./components/SelectScheduleTime"
import { setAppointment } from "../db/appointments"

const Schedule = props => {
  const [formValues, setFormValues] = useState({})

  const {
    effects: { navToSchedule },
    state: { availability }
  } = props

  useEffect(
    () => {
      // if (diff(availability || {}, formValues || {}))
      setFormValues(cloneDeep(availability))
    },
    [props.state]
  )

  const curryTimeHandler = setPath => {
    return value => {
      const val = isNaN(value) ? undefined : +value
      setFormValues(cloneDeep(set(formValues, setPath, val)))
    }
  }

  const saveChanges = () => {
    const newAvailability = cloneDeep(formValues)

    // delete any dayofwk keys that have "undefined" start|end values
    // delete any dayofwk if start is greater than end or visa-versa
    Object.entries(formValues).forEach(([stylist, avail]) => {
      if (avail && Object.keys(avail).length) {
        Object.entries(avail).forEach(([dow, schedule]) => {
          if (
            (schedule.hasOwnProperty("start") &&
              (!schedule.start || !schedule.hasOwnProperty("end"))) ||
            schedule.start >= schedule.end
          )
            delete newAvailability[stylist][dow]
          if (
            (schedule.hasOwnProperty("end") &&
              (!schedule.end || !schedule.hasOwnProperty("start"))) ||
            schedule.end <= schedule.start
          )
            delete newAvailability[stylist][dow]
        })
      }
    })

    writeAvailability({ availabilityObject: newAvailability })
    setFormValues(newAvailability)
  }

  return (
    <div className="schedule-container">
      <div className="d-flex justify-content-center">
        <h3>Barber Schedules'</h3>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mx-2"
          onClick={() => navToSchedule(false)}
        >
          Done
        </button>

        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            window
              .swal("Name", {
                content: "input"
              })
              .then(name => {
                if (!name) return

                setFormValues(
                  Object.assign(cloneDeep(formValues), { [name]: {} })
                )
              })
          }}
        >
          + Barber
        </button>

        {Object.keys(diff(availability || {}, formValues || {})).length > 0 && (
          <button className="btn btn-primary mx-2" onClick={saveChanges}>
            Save Changes
          </button>
        )}
      </div>

      {Object.keys(formValues || {}).map(stylist => {
        const mon = get(availability, `${stylist}.1`, {})
        const tue = get(availability, `${stylist}.2`, {})
        const wed = get(availability, `${stylist}.3`, {})
        const thu = get(availability, `${stylist}.4`, {})
        const fri = get(availability, `${stylist}.5`, {})
        const sat = get(availability, `${stylist}.6`, {})
        const sun = get(availability, `${stylist}.7`, {})

        return (
          <div
            className="align-items-center d-flex flex-column justify-content-center mt-5"
            key={stylist}
          >
            <h5>
              {stylist}{" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  window
                    .swal("Are you sure you want to Remove " + stylist + "?", {
                      buttons: {
                        confirm: "Yes, Delete Barber",
                        cancelAppt: {
                          text: "No",
                          value: "cancel"
                        }
                      }
                    })
                    .then(value => {
                      switch (value) {
                        case "cancel":
                          return null
                      }

                      const newFormValues = cloneDeep(formValues)

                      delete newFormValues[stylist]

                      setFormValues(newFormValues)
                    })
                }}
                style={{ border: "none" }}
              >
                <i className="fa fa-minus" /> Remove
              </button>
            </h5>
            <div>
              <div className="d-flex my-2">
                <div className="mr-3">Monday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.1.start`)}
                  value={mon.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.1.end`)}
                  value={mon.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Tuesday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.2.start`)}
                  value={tue.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.2.end`)}
                  value={tue.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Wednesday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.3.start`)}
                  value={wed.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.3.end`)}
                  value={wed.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Thursday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.4.start`)}
                  value={thu.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.4.end`)}
                  value={thu.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Friday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.5.start`)}
                  value={fri.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.5.end`)}
                  value={fri.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Saturday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.6.start`)}
                  value={sat.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.6.end`)}
                  value={sat.end}
                />
              </div>

              <div className="d-flex my-2">
                <div className="mr-3">Sunday</div>
                <SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.7.start`)}
                  value={sun.start}
                />-<SelectScheduleTime
                  onChange={curryTimeHandler(`${stylist}.7.end`)}
                  value={sun.end}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Schedule.propTypes = {}
Schedule.defaultProps = {}

export default injectState(Schedule)
