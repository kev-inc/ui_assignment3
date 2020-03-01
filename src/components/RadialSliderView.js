import React from 'react';
import sunLogo from '../sun.png'

class RadialSliderView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentColor: "#586367"
    }
  }

  componentDidMount() {
    this.renderTicks()
  }

  renderTicks() {
    const ctx = this.refs.canvas.getContext("2d")
    for (var i = 5; i < 60 - 5; i++) {
      const angle = Math.PI / 2 + (i / 60) * 2 * Math.PI;
      ctx.beginPath();
      ctx.ellipse(
        200 + (100 - 20) * Math.cos(angle),
        200 + (100 - 20) * Math.sin(angle),
        10,
        1,
        angle,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#ddd";
      ctx.fill();
    }
  }

  handleClick = event => {
    const { mousedown } = this.state;
    const canvas_width = 400
    const canvas_height = 400
    const { setTargetTemp } = this.props
    if (mousedown) {
      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const yCoord = event.nativeEvent.y - rect.top - canvas_height / 2;
      const xCoord = event.nativeEvent.x - rect.left - canvas_width / 2;
      const angle = (Math.atan2(xCoord, -yCoord) / Math.PI) * 180 + 180;
      if (angle > 30 && angle < 330) {
        const temp = Math.round(((angle - 30) / 300) * 30 + 50);
        console.log(this.props.mode)
        setTargetTemp(temp)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newMode = this.props.mode
    const oldMode = prevProps.mode
    if(newMode === "heating" && oldMode !== "heating") {
      this.setState({currentColor: "#FD635A"})
    } else if(newMode === "cooling" && oldMode !== "cooling") {
      this.setState({currentColor: "#5495CA"})
    }
  }



  render() {
    const { currentTemp, targetTemp, mode } = this.props

    return (
      <div className="container">

        <div class="outer-circle"></div>
        <div class="inner-circle"></div>
        <div class="thermostat-border"></div>
        <div class="grey-quadrant"></div>
        <div class="thermostat-bg" style={{backgroundColor: this.state.currentColor}}></div>
        <div class={`thermostat-gradient ${mode}`}></div>
        <div class="temp">
          <div class="target-temp">{targetTemp}</div>
          <div class="current-temp">Current: {currentTemp}</div>
        </div>
        <img class="sun-logo" src={sunLogo} alt="sun"/>
        <canvas ref="canvas" width="400" height="400"
          onMouseMove={this.handleClick}
          onMouseDown={() => this.setState({ mousedown: true })}
          onMouseUp={() => this.setState({ mousedown: false })} />
      </div>
    );
  }
}

export default RadialSliderView;
