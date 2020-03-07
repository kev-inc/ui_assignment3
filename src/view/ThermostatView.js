import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { thermostatMachine } from '../statechart/thermostatMachine'

import sunLogo from '../sun.png'

function renderCanvas(ref, angle) {
  const ctx = ref.current.getContext("2d")
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

export default function ThermostatView() {

  const ref = React.useRef(null)
  
  const [current, send] = useMachine(thermostatMachine)

  const { model } = current.context
  const { targetTemp, currentTemp, mode } = model

  useEffect(() => {
    const angle = (targetTemp-50)/30*300 + 30
    renderCanvas(ref, Math.PI / 2 + angle / 360 * 2 * Math.PI)
  })

  return (
    <div className="container">
      <div class="outer-circle"></div>
      <div class="inner-circle"></div>
      <div class="thermostat-border"></div>
      <div class="grey-quadrant"></div>
      <div class="thermostat-bg" style={{ backgroundColor: "#586367" }}></div>
      <div class={`thermostat-gradient ${mode}`}></div>
      <div class="temp">
        <div class="target-temp">{targetTemp}</div>
        <div class="current-temp">Current: {currentTemp}</div>
      </div>
      <img class="sun-logo" src={sunLogo} alt="sun" />
      <canvas ref={ref} width="400" height="400" />
    </div>
  )
}
