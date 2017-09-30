import React, { Component } from 'react'
import { CanvasGrid } from '../components/CanvasGrid'

class CanvasGridContainer extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            trackMouseMovement: false,
            canvasGrid: []
        }
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)     
        this.onMouseUp = this.onMouseUp.bind(this) 
        this.onMouseLeave = this.onMouseLeave.bind(this)   
        this.onMouseEnter = this.onMouseEnter.bind(this)                 
        this.emit = this.emit.bind(this)         
        this.relativePos = this.relativePos.bind(this) 
    }

    componentDidMount() {

        //need to figure out better way than getElementById

        const { socket } = this.props 

        socket.onopen = (e) => {
            console.log("on open")
        }

        socket.onmessage = (e) => {
            console.log("on message, now update with data")
            const data = JSON.parse(e.data)

            const canvas = document.getElementById(data.id)
            const cx = canvas.getContext('2d')

            var img = new Image();
            img.onload = () => {
                cx.drawImage(img,0,0);                
            }
            img.src = data.canvas

        }

    }

    onMouseDown(e, id) {

        const cx = document.getElementById(id).getContext('2d')
        const pos = this.relativePos(e, cx.canvas)

        cx.moveTo(pos.x, pos.y)       
        this.setState({trackMouseMovement: true})
    }

    onMouseMove(e, id) {
        if (this.state.trackMouseMovement) {
            const cx = document.getElementById(id).getContext('2d')
            const pos = this.relativePos(e, cx.canvas)

            cx.lineJoin = 'round'
            cx.lineWidth = 5
                        
            cx.lineTo(pos.x, pos.y)
            cx.stroke()
        }   
    }

    onMouseEnter(e, id) {
        const cx = document.getElementById(id).getContext('2d')
        const pos = this.relativePos(e, cx.canvas)
        cx.moveTo(pos.x, pos.y)
    }

    onMouseLeave(e, id) {
        this.emit(id)
    }

    onMouseUp(e, id) {
        this.emit(id)        
        this.setState({trackMouseMovement: false})
    }

    emit(id) {

        const { socket } = this.props   
        const canvas = document.getElementById(id)
        const data = canvas.toDataURL()
        socket.send(JSON.stringify({
            event: 'update',
            id: id,
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

        //const canvasGrid = this.state.canvasGrid

        const canvasGrid = [
            {},
            {},
            {}
        ]

        return (
            <CanvasGrid 
                canvasGrid={canvasGrid}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
            />
        )
    }

}

export default CanvasGridContainer