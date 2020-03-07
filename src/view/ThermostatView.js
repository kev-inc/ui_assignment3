import React, { useEffect } from 'react'
import sunLogo from '../sun.png'

export default class ThermostatView extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      mouseDown: false
    }
  }

  componentDidMount() {
    const [current, send] = this.props.thermostatMachine
    const targetTemp = current.context.target
    const angle = (targetTemp-50)/30*300 + 30
    this.renderCanvas(Math.PI / 2 + angle / 360 * 2 * Math.PI)
  }

  componentDidUpdate() {
    const [current, send] = this.props.thermostatMachine
    const targetTemp = current.context.target
    const angle = (targetTemp-50)/30*300 + 30
    this.renderCanvas(Math.PI / 2 + angle / 360 * 2 * Math.PI)
  }

  getBgColor(mode) {
    switch(mode) {
      case "heating": return "#FD635A" 
      break
      case "cooling": return "#5495CA"
      break
      default: return "#586367"
    }
  }

  renderCanvas(angle) {
    const ctx = this.refs.canvas.getContext("2d")
    ctx.clearRect(0, 0, 400, 400) // clear canvas
  
    // redraw indicator ticks
    for (var i = 5; i < 60 - 4; i++) {
      const tempAngle = Math.PI / 2 + (i / 60) * 2 * Math.PI;
      ctx.beginPath();
      ctx.ellipse(200 + 80 * Math.cos(tempAngle), 200 + 80 * Math.sin(tempAngle), 10, 1, tempAngle, 0, 2 * Math.PI);
      ctx.fillStyle = "#ddd";
      ctx.fill();
    }
  
    // redraw yellow dot
    ctx.beginPath()
    ctx.ellipse(200 + 90 * Math.cos(angle), 200 + 90 * Math.sin(angle), 5, 5, angle, 0, 2 * Math.PI)
    ctx.fillStyle = "yellow"
    ctx.fill()
  }

  handleScroll = event => {
    const [current, send] = this.props.thermostatMachine
    const scrollDirection = event.nativeEvent.deltaY
    if (scrollDirection > 0) {
      send("CLOCKWISE")
    } else if (scrollDirection < 0) {
      send("ANTICLOCKWISE")
    }
  }

  handleMouseDown (nativeEvent) {
    this.setState({mouseDown: true}, () => this.handleMouseMove(nativeEvent))
  }
  
  handleMouseUp = () => {
    this.setState({mouseDown: false})
  }
  
  handleMouseMove(nativeEvent) {
    const canvas_width = 400
    const canvas_height = 400
    const { mouseDown } = this.state;
    const [current, send] = this.props.thermostatMachine
    if(mouseDown) {
      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const yCoord = nativeEvent.y - rect.top - canvas_height / 2;
      const xCoord = nativeEvent.x - rect.left - canvas_width / 2;
      const angle = (Math.atan2(xCoord, -yCoord) / Math.PI) * 180 + 180;
      if (angle > 30 && angle < 330) {
        const temp = Math.round(((angle - 30) / 300) * 30 + 50);
        send("setTarget", {targetTemp: temp})
      }
    }
  }

  render() {
    const [current, send] = this.props.thermostatMachine
    const currentTemp = current.context.current
    const targetTemp = current.context.target
    const mode = current.value.modes
    return (
      <div className="container">
        <div class="outer-circle"></div>
        <div class="inner-circle"></div>
        <div class="thermostat-border"></div>
        <div class="grey-quadrant"></div>
        <div class="thermostat-bg" style={{ backgroundColor: this.getBgColor(mode) }}></div>
        <div class={`thermostat-gradient ${mode}`}></div>
        <div class="temp">
          <div class="target-temp">{targetTemp}</div>
          <div class="current-temp">Current: {currentTemp}</div>
        </div>
        <img class="sun-logo" src={sunLogo} alt="sun" />
        <canvas ref="canvas" width="400" height="400"
          onMouseDown={event => this.handleMouseDown(event.nativeEvent)}
          onMouseUp={this.handleMouseUp}
          onMouseMove={event => this.handleMouseMove(event.nativeEvent)}
          onWheel={this.handleScroll}
        />
      </div>
    )
  }
}