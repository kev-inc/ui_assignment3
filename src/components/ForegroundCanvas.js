import React from 'react';

class ForegroundCanvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_color: { r: 88, g: 99, b: 103 },
            hot_color: { r: 253, g: 99, b: 90 },
            cool_color: { r: 84, g: 149, b: 202 },
            stroke_weight: 5,
            ticks: 60,
            target_temp: 72, 
            mousedown: false
        }
    }

    componentDidMount() {

        this.renderForeground()
    }

    componentDidUpdate() {
        this.renderForeground()
    }

    handleScroll = event => {
        // event.preventDefault()
        const scrollDirection = event.nativeEvent.deltaY
        const { target_temp } = this.state
        if(scrollDirection < 0 && target_temp < 100) {
            this.setState({target_temp: target_temp + 1})
        } else if(scrollDirection > 0 && target_temp > 32) {
            this.setState({target_temp: target_temp - 1})
        }
    }

    renderForeground() {
        const { canvas_width, canvas_height, radius } = this.props.canvas_dimens
        const current_temp = this.props.current_temp
        const { current_color, hot_color, cool_color, stroke_weight, ticks, target_temp } = this.state
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        const gradient = ctx.createLinearGradient(
            canvas_width / 2 - radius / 2,
            canvas_height / 2,
            canvas_width / 2 + radius / 2,
            canvas_height / 2
        )
        gradient.addColorStop(0, `rgb(${cool_color.r}, ${cool_color.g}, ${cool_color.b})`);
        gradient.addColorStop(1, `rgb(${hot_color.r}, ${hot_color.g}, ${hot_color.b})`);

        ctx.beginPath()

        // radial slider
        ctx.fillStyle = `rgb(${current_color.r}, ${current_color.g}, ${current_color.b})`
        ctx.arc(canvas_width / 2, canvas_height / 2, radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.lineWidth = stroke_weight
        ctx.strokeStyle = gradient
        ctx.stroke()

        //
        ctx.beginPath()
        ctx.arc(canvas_width / 2, canvas_height / 2, radius, Math.PI / 4, 3 * Math.PI / 4)
        ctx.strokeStyle = "#51565c"
        ctx.stroke()

        // ticks
        for (var i = 5; i < ticks - 4; i++) {
            const angle = Math.PI / 2 + (i / ticks) * 2 * Math.PI;
            ctx.beginPath();
            ctx.ellipse(
                canvas_width / 2 + (radius - 15) * Math.cos(angle),
                canvas_height / 2 + (radius - 15) * Math.sin(angle),
                10,
                1,
                angle,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "white";
            ctx.fill();
        }

        // target temp
        ctx.font = "bold 56px Arial";
        ctx.fillStyle="white"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(target_temp, canvas_width / 2, canvas_height / 2);
        
        // current temp
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Current: " + current_temp, canvas_width / 2, canvas_height / 2 + 30);
    }

    handleClick = event => {
        const { mousedown } = this.state;
        const { canvas_width, canvas_height } = this.props.canvas_dimens
        if (mousedown) {
        const canvas = this.refs.canvas;
        const rect = canvas.getBoundingClientRect();
        const yCoord = event.nativeEvent.y - rect.top - canvas_height / 2;
        const xCoord = event.nativeEvent.x - rect.left - canvas_width / 2;
        const angle = (Math.atan2(xCoord, -yCoord) / Math.PI) * 180 + 180;
        if (angle > 30 && angle < 330) {
            const temp = Math.round(((angle - 30) / 300) * 68 + 32);
            this.setState({ target_temp: temp });
        }
        }
    }

    render() {
        const { canvas_width, canvas_height } = this.props.canvas_dimens
        return (
            <canvas 
                id="foreground" 
                ref="canvas" 
                width={canvas_width} 
                height={canvas_height} 
                onWheel={this.handleScroll}
                onMouseMove={this.handleClick}
                onMouseDown={() => this.setState({ mousedown: true })}
                onMouseUp={() => this.setState({ mousedown: false })}
            />
        );
    }
}

export default ForegroundCanvas;
