import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import AppErrorBoundery from './AppErrorBoundery'
import registerServiceWorker from './registerServiceWorker'

import pckg from '../package.json'

import './index.css'


import swal from 'sweetalert'

window.Raven.config('https://f12d35a63e3f4264a168eb0e8caa6802@sentry.io/287059', {
  release: pckg.version,
}).install()

ReactDOM.render(
  <AppErrorBoundery>
    <App />
  </AppErrorBoundery>,
  document.getElementById('root'),
)
registerServiceWorker()

// make this global
window.swal = swal
