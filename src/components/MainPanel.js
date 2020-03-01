import React from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import ForegroundCanvas from './ForegroundCanvas';

class MainPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            canvas_width: 300,
            canvas_height: 300, 
            radius: 100
        }
    }
  render() {
      
    return (
      <div className="MainPanel">
          <BackgroundCanvas canvas_dimens={this.state}/>
          <ForegroundCanvas canvas_dimens={this.state} current_temp={this.props.current_temp}/>
      </div>
    );
  }
}

export default MainPanel;
