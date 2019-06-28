import React from "react"
// import PropTypes from 'prop-types'

const hrs = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

const normalizeTime = hr => {
  if (hr > 12) return `${hr - 12} pm`

  return `${hr} am`
}

const SelectScheduleTime = ({ onChange, value }) => (
  <select
    className="form-control"
    onChange={e => onChange(e.currentTarget.value)}
    style={{ width: "75px" }}
    defaultValue={value}
  >
    <option>Off</option>

    {hrs.map(h => <option key={h} value={h}>{normalizeTime(h)}</option>)}
  </select>
)

SelectScheduleTime.propTypes = {}
SelectScheduleTime.defaultProps = {}

export default SelectScheduleTime
