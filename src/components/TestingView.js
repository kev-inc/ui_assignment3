import React from 'react'

export default function TestingView(props) {

  const [current, send] = props.thermostatModel
  const currentTemp = current.context.current

  return(
    <div class="testingview">
      <span>Set Current Temperature</span>
      <input type="text" style={{ width: 40 }} value={currentTemp} onChange={event => send("setCurrent", {currentTemp: event.target.value})}/>
      <input type="range" min="32" max="100" value={currentTemp} onChange={event =>  send("setCurrent", {currentTemp: event.target.value})}/>
    </div>
  )
}