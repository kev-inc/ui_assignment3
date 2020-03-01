import React from 'react';

class BackgroundCanvas extends React.Component {

    componentDidMount() {
        this.renderBackground()
    }

    renderBackground() {
        const { canvas_width, canvas_height, radius } = this.props.canvas_dimens
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        // background
        ctx.fillStyle = "#d3d2d9"
        ctx.fillRect(0, 0, canvas_width, canvas_height)

        // outer ring
        ctx.beginPath()
        ctx.arc(canvas_width / 2, canvas_height / 2, radius + 20, 0, 2 * Math.PI)
        ctx.fillStyle = "#f8f8f8"
        ctx.fill()

        // inner ring
        ctx.beginPath();
        ctx.arc(canvas_width / 2, canvas_height / 2, radius + 12, 0, 2 * Math.PI);
        ctx.shadowColor = "#ddd";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

    }

    render() {
        const { canvas_width, canvas_height } = this.props.canvas_dimens
        return (
            <canvas id="background" ref="canvas" width={canvas_width} height={canvas_height} />
        );
    }
}

export default BackgroundCanvas;
