import React from 'react'

class TestingView extends React.Component {

  onCurrentTempChange = event => {
    const newTemp = event.target.value
    this.props.setCurrentTemp(newTemp)
  }

  render() {
    const {currentTemp} = this.props
    return (
      <div class="testingview">
        <span>Set Current Temperature</span>
        <input type="text" style={{ width: 40 }} value={currentTemp} onChange={this.onCurrentTempChange} />
        <input type="range" min="32" max="100" value={currentTemp} onChange={this.onCurrentTempChange} />
      </div>
    )

  }
}

export default TestingView