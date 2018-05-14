import React from 'react'
import { provideState } from "freactal"

import state from "state"

const Provider = ({ children }) => {
  return (
    <div className="d-flex flex-column h-100 w-100">
      {children}
    </div>
  )
}

export default provideState(state)(Provider)
