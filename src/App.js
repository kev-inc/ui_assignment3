import React from 'react';
import './App.css';
import TestingView from './components/TestingView';
import ThermostatView from './view/ThermostatView';

import { useMachine } from '@xstate/react'
import { ThermostatModel } from './model/Thermostat.model'

export default function App() {

  const thermostatModel = useMachine(ThermostatModel)

  return (
    <div className="App">
      <ThermostatView thermostatModel={thermostatModel}/>
      <TestingView thermostatModel={thermostatModel}/>
    </div>
  );
}