import React, { Component } from 'react';

class CanvasSection extends Component {  
    
    //register clients in ws
    //send draw events across ws
    //save canvas state in server (archive)
    //get canvas state on join

    //canvas grid, good time for redux perhaps 

    constructor(props) {
        super(props)
        this.state = {
            trackMouseMovement: false
        }
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)     
        this.onMouseUp = this.onMouseUp.bind(this) 
        this.relativePos = this.relativePos.bind(this) 
    }

    componentDidMount() {
        //get canvas state from server
    }

    onMouseDown(e) {
        const cx = this.refs.canvas.getContext('2d')
        const pos = this.relativePos(e, cx.canvas)

        cx.moveTo(pos.x, pos.y)       
        this.setState({trackMouseMovement: true})
    }

    onMouseMove(e) {
        if (this.state.trackMouseMovement) {
            const cx = this.refs.canvas.getContext('2d')
            const pos = this.relativePos(e, cx.canvas)

            cx.lineJoin = 'round'
            cx.lineWidth = 5
                        
            cx.lineTo(pos.x, pos.y)
            cx.stroke()
        }   
    }

    onMouseUp(e) {
        this.setState({trackMouseMovement: false})
    }

    relativePos(event, element) {
        var rect = element.getBoundingClientRect();
        return {
            x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)
        }
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
        )
    }

}

export default CanvasSection;