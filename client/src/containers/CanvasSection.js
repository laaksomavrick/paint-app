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
        this.emit = this.emit.bind(this)         
        this.relativePos = this.relativePos.bind(this) 
    }

    componentDidMount() {

        //pull this to container when making grid
        //make this component visual, container will have state obj of canvas data

        const { socket } = this.props 

        socket.onopen = (e) => {
            console.log("on open")
        }

        socket.onmessage = (e) => {
            console.log("on message, now update with data")
            const data = JSON.parse(e.data)
            console.log(data.canvas)

            const canvas = this.refs.canvas
            const cx = canvas.getContext('2d')

            var img = new Image();
            img.onload = () => {
                cx.drawImage(img,0,0);                
            }
            img.src = data.canvas

        }

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
        this.emit()        
        this.setState({trackMouseMovement: false})
    }

    emit() {

        const { socket } = this.props   
        const canvas = this.refs.canvas
        const data = canvas.toDataURL()
        socket.send(JSON.stringify({
            event: 'update',
            canvas: data
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