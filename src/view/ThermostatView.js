import React from 'react'
import sunLogo from '../sun.png'

export default class ThermostatView extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      mouseDown: false
    }
  }

  componentDidMount() {
    // get model
    const [current, send] = this.props.thermostatModel
    // get target temp
    const targetTemp = current.context.target
    // calculate position of yellow dot
    const angle = (targetTemp-50)/30*300 + 30
    // render yellow dot
    this.renderCanvas(Math.PI / 2 + angle / 360 * 2 * Math.PI)
    
    // prevent default for canvas
    const canvas = this.refs.canvas
    canvas.addEventListener("wheel", e => e.preventDefault())
  }

  componentDidUpdate() {
   // get model
   const [current, send] = this.props.thermostatModel
   // get target temp
   const targetTemp = current.context.target
   // calculate position of yellow dot
   const angle = (targetTemp-50)/30*300 + 30
   // render yellow dot
   this.renderCanvas(Math.PI / 2 + angle / 360 * 2 * Math.PI)
  }

  renderCanvas(angle) {
    const ctx = this.refs.canvas.getContext("2d")

    // clear canvas
    ctx.clearRect(0, 0, 400, 400) 
  
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
    const [current, send] = this.props.thermostatModel
    const scrollDirection = event.nativeEvent.deltaY
    if (scrollDirection > 0) {
      // scroll upwards
      send("CLOCKWISE")
    } else if (scrollDirection < 0) {
      // scroll downwards
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
    // dimensions of canvas
    const canvas_width = 400
    const canvas_height = 400
    
    const { mouseDown } = this.state;
    const [current, send] = this.props.thermostatModel
    if(mouseDown) {
      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const yCoord = nativeEvent.y - rect.top - canvas_height / 2;
      const xCoord = nativeEvent.x - rect.left - canvas_width / 2;
      const angle = (Math.atan2(xCoord, -yCoord) / Math.PI) * 180 + 180;
      if (angle > 30 && angle < 330) {
        // position of mouse is within the accepted limits of thermostat
        // calculate temp based on position of mouse
        const temp = Math.round(((angle - 30) / 300) * 30 + 50);
        send("setTarget", {targetTemp: temp})
      }
    }
  }

  render() {
    const [current, send] = this.props.thermostatModel
    const currentTemp = current.context.current
    const targetTemp = current.context.target
    const mode = current.value.modes
    return (
      <div className="container">
        <div class="outer-circle"></div>
        <div class="inner-circle"></div>
        <div class="thermostat-border"></div>
        <div class="grey-quadrant"></div>
        <div class={`thermostat-bg ${mode}`} ></div>
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