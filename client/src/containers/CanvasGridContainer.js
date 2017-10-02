import React, { Component } from 'react'
import { CanvasGrid } from '../components/CanvasGrid'

class CanvasGridContainer extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            trackMouseMovement: false,
            previousX: null,
            previousY: null,
            movementAxis: null,
            loaded: false,
            canvasGrid: []
        }
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)     
        this.onMouseUp = this.onMouseUp.bind(this) 
        this.onMouseLeave = this.onMouseLeave.bind(this)   
        this.onMouseEnter = this.onMouseEnter.bind(this)                 
        this.emit = this.emit.bind(this)         
        this.relativePos = this.relativePos.bind(this) 
        this.boundedPos = this.boundedPos.bind(this)    
        this.setMovementAxis = this.setMovementAxis.bind(this)
        this.getCanvas = this.getCanvas.bind(this)  
    }

    componentDidMount() {

        const { socket } = this.props 

        socket.onmessage = (e) => {

            const message = JSON.parse(e.data)

            if (message) {

                if (message.Event == 'update') {
        
                    const updatedCanvas = {Id: message.Id, Src: message.Src}
                    let canvasGrid = this.state.canvasGrid
                    canvasGrid[message.Id] = updatedCanvas
                    this.setState({canvasGrid: canvasGrid})

                } else if (message.Event == 'get') {

                    this.setState({canvasGrid: message.CanvasGrid})

                }

            }

        }

    }

    onMouseDown(e, id) {

        const cx = this.getCanvas(id).getContext('2d')
        const pos = this.relativePos(e, cx.canvas)

        cx.moveTo(pos.x, pos.y)       
        this.setState({trackMouseMovement: true})
    }

    onMouseMove(e, id) {

        if (this.state.trackMouseMovement) {

            const cx =this.getCanvas(id).getContext('2d')
            const pos = this.relativePos(e, cx.canvas)

            this.setMovementAxis(pos)       

            cx.lineJoin = 'round'
            cx.lineWidth = 7
                        
            cx.lineTo(pos.x, pos.y)
            cx.stroke()
        } 

    }

    onMouseEnter(e, id) {

        if (this.state.trackMouseMovement) {

            const cx = this.getCanvas(id).getContext('2d')
            const pos = this.boundedPos(e, cx.canvas)
            cx.moveTo(pos.x, pos.y)

            cx.lineTo(pos.x, pos.y)
            cx.stroke()
        }

    }

    onMouseLeave(e, id) {

        if (this.state.trackMouseMovement) {
            const cx = this.getCanvas(id).getContext('2d')
            const pos = this.relativePos(e, cx.canvas)

            if (this.state.movementAxis == 'x') {
                cx.lineTo(pos.x, pos.y)
                cx.stroke()
            }

            this.emit(id)
        }

    }

    onMouseUp(e, id) {

        this.emit(id)        
        this.setState({trackMouseMovement: false})

    }

    emit(id) {

        const { socket } = this.props   
        const canvas = this.getCanvas(id)
        const data = canvas.toDataURL()
        socket.send(JSON.stringify({
            Event: 'update',
            Id: id, 
            Src: data
        }))

    }

    relativePos(event, element) {

        var rect = element.getBoundingClientRect()

        return {
            x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)
        }

    }

    boundedPos(event, element) {

        const rect = element.getBoundingClientRect()
        //const movementAxis = this.state.movementAxis        

        let estX = Math.floor(event.clientX - rect.left)            
        let estY = Math.floor(event.clientY - rect.top)

        // if (movementAxis == 'x') {
        //     if (estX >= 128) { estX = 255} else { estX = 0 }
        // } else if (movementAxis == 'y') {
        //     if (estY >= 128) { estY = 255} else { estY = 0 }
        // }

        if (estX >= 128) { estX = 255} else { estX = 2 }    
        
        console.log(estX)
    
        return { 
            x: estX, 
            y: estY 
        }

    }

    setMovementAxis(pos) {

        const previousX = this.state.previousX
        const previousY = this.state.previousY

        const amplitudeX = Math.abs(previousX - pos.x)
        const amplitudeY = Math.abs(previousY - pos.y)            

        if (amplitudeX >= amplitudeY) {
            this.setState({movementAxis: 'x'})
        } else {
            this.setState({movementAxis: 'y'})
        }

        this.setState({previousX: pos.x})
        this.setState({previousY: pos.y})   

    }

    getCanvas(id) {

        const canvas = document.getElementById(id)
        return canvas

    }

    render() {

        const canvasGrid = this.state.canvasGrid

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