import React, { Component } from "react"
import { injectState } from "freactal"
import CustomerDesktop from "./CustomerDesktop"
import CustomerMobile from "./CustomerMobile"

class Customer extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
  }

  handleResize = () => {
    this.forceUpdate()
  }

  render() {
    if (window.innerWidth > 750) {
      return <CustomerDesktop />
    }

    return <CustomerMobile />
  }
}

export default injectState(Customer)
