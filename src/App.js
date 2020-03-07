import React from 'react';
import './App.css';
import TestingView from './components/TestingView';
import RadialSliderModel from './components/RadialSliderModel';
import ThermostatView from './view/ThermostatView';

import { useMachine } from '@xstate/react'
import { ThermostatMachine } from './statechart/ThermostatMachine'

export default function App() {

  const thermostatMachine = useMachine(ThermostatMachine)

  return (
    <div className="App">
      <ThermostatView thermostatMachine={thermostatMachine}/>
      <TestingView thermostatMachine={thermostatMachine}/>
    </div>
  );
}