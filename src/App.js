import React from 'react';
import './App.css';
import MainPanel from './components/MainPanel';
import TestingUI from './components/TestingUI';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current_temp: 72
    }
  }

  onCurrentTempChange = event => {
    this.setState({current_temp: event.target.value})
  }

  render() {
    const { current_temp } = this.state
    return (
      <div className="App">
        <MainPanel current_temp={current_temp}/>
        <TestingUI current_temp={current_temp} onCurrentTempChange={this.onCurrentTempChange}/>
      </div>
    );
  }
}

export default App;
