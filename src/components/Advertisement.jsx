import React from 'react'
// import PropTypes from 'prop-types'

class Advertisement extends React.Component {
  state = {
    show: false
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      });

    }, 1000 * 60 * 1)
  }


  render() {
    if (!this.state.show) return null

    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Advertisement</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ show: false })}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="d-flex justify-content-center modal-body w-100">
              <img src="/img/Oxyfresh.jpg" />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Advertisement.propTypes = {}
Advertisement.defaultProps = {}

export default Advertisement
