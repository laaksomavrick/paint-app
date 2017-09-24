import React, { Component } from 'react';

class CanvasSection extends Component {    

    constructor(props) {
        super(props)
        this.state = {
            previousPosition: {x: 0, y: 0},
            trackMouseMovement: false
        }
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)     
        this.onMouseUp = this.onMouseUp.bind(this) 
        this.setPosition = this.setPosition.bind(this)         
    }

    componentDidMount() {
        //get canvas state from server
    }

    onMouseDown(e) {
        this.setState({trackMouseMovement: true})
    }

    onMouseMove(e) {

        if (this.state.trackMouseMovement) {

            const canvas = this.refs.canvas
            const cx = canvas.getContext('2d')

            cx.beginPath()

            cx.lineWidth = 5
            cx.lineCap = 'round'
            cx.strokeStyle = '#c0392b'

            let pos = this.state.previousPosition
                        
            cx.moveTo(pos.x, pos.y)
            this.setPosition(e)
            cx.lineTo(pos.x, pos.y)         

            cx.stroke()

        }
                
    }

    setPosition(e) {
        this.setState({previousPosition: {x: e.clientX, y: e.clientY}})
    }

    onMouseUp(e) {
        this.setState({trackMouseMovement: false})
    }


    render() {
        return (
            <canvas 
                ref="canvas"
                width="500" 
                height="500" 
                style={{'border': '1px solid #000000'}}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
            </canvas>
        );
    }

}

export default CanvasSection;