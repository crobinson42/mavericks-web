import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AppErrorBoundery from './AppErrorBoundery'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <AppErrorBoundery>
    <App />
  </AppErrorBoundery>,
  document.getElementById('root'),
)
registerServiceWorker()
