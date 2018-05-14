import React, { Component } from "react"
import { injectState } from "freactal"

import state from './index.js'

class LocalStorageStateSync extends Component {
  componentDidMount() {
    this.save()
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
      this.save()
  }

  save = () => {
    console.log('saving...',this.props.state)
    try {
      localStorage.setItem('mavcuts', JSON.stringify(this.props.state))
    } catch (e) {
      console.error('LocalStorage.setItem error', e)
    }
    console.log('JSON.stringify(localStorage.getItem(\'mavcuts\'))', localStorage.getItem('mavcuts'))
  }

  render() {
    return <div />
  }
}

export default injectState(LocalStorageStateSync, Object.keys(state.initialState()))
