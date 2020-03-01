import React from 'react'

class TestingUI extends React.Component {


    render() {
        const {current_temp} = this.props
        return (
            <div id="testingui">
                <span>Set Current Temperature</span>
                <input type="text" style={{ width: 40 }} value={current_temp} onChange={this.props.onCurrentTempChange} />
                <input type="range" min="50" max="80" value={current_temp} onChange={this.props.onCurrentTempChange} />
            </div>
        )

    }
}

export default TestingUI