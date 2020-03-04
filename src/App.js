import React from 'react';
import './App.css';
import RadialSliderView from './components/RadialSliderView';
import TestingView from './components/TestingView';
import RadialSliderModel from './components/RadialSliderModel';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      radialSliderModel: new RadialSliderModel()
    }
  }

  setTargetTemp = newTemp => {
    const model = this.state.radialSliderModel
    model.setTargetTemp(newTemp)
    this.setState({radialSliderModel: model})
  }

  setCurrentTemp = newTemp => {
    const model = this.state.radialSliderModel
    model.setCurrentTemp(newTemp)
    this.setState({radialSliderModel: model})
  }

  render() {
    const { currentTemp, targetTemp, mode } = this.state.radialSliderModel
    return (
      <div className="App">
        <RadialSliderView 
          currentTemp={currentTemp} 
          targetTemp={targetTemp}
          mode={mode}
          setTargetTemp={this.setTargetTemp}
          />
        <TestingView 
          currentTemp={currentTemp} 
          setCurrentTemp={this.setCurrentTemp}
          />
      </div>
    );
  }
}

export default App;
