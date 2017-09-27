import React, { Component } from 'react';

class CanvasSection extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            trackMouseMovement: false
        }
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)     
        this.onMouseUp = this.onMouseUp.bind(this) 
        this.update = this.update.bind(this)         
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
        this.update()        
        this.setState({trackMouseMovement: false})
    }

    update() {

        //may need a better strategy than updating whole canvas per stroke

        //on conn, add user to list of clients

        //broadcast each event of type update to all clients

        const { socket } = this.props   
        const canvas = this.refs.canvas
        const data = canvas.toDataURL()
        socket.send(JSON.stringify({
            type: 'update',
            data: data
        }))
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
                width="250" 
                height="250" 
                style={{'border': '1px solid #000000'}}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
            </canvas>
        )
    }

}

export default CanvasSection;