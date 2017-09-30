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

        //need to figure out better way than getElementById
            //won't be ncessary once server call init
            //can just update 
            //update Canvas to use ref, local variable dicated by state for dataURL?

        const { socket } = this.props 

        socket.onopen = (e) => {

            console.log("on open")

        }

        socket.onmessage = (e) => {

            const data = JSON.parse(e.data)

            if (data) {

                const canvas = this.getCanvas(data.id)
                const cx = canvas.getContext('2d')
    
                var img = new Image();
                img.onload = () => {
                    cx.drawImage(img,0,0);                
                }
                img.src = data.canvas

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
            cx.lineWidth = 5
                        
            cx.lineTo(pos.x, pos.y)
            cx.stroke()
        } 

    }

    onMouseEnter(e, id) {
        if (this.state.trackMouseMovement) {

            const cx = this.getCanvas(id).getContext('2d')
            const pos = this.boundedPos(e, cx.canvas)
            cx.moveTo(pos.x, pos.y)
            console.log("on mouse enter: " + this.state.movementAxis)

        }
    }

    onMouseLeave(e, id) {
        if (this.state.trackMouseMovement) {
            const cx = this.getCanvas(id).getContext('2d')
            const pos = this.boundedPos(e, cx.canvas)
            cx.lineTo(pos.x, pos.y)
            cx.stroke()
            this.emit(id)
            console.log("on mouse leave: " + this.state.movementAxis)
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
            event: 'update',
            id: id,
            canvas: data
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
        const movementAxis = this.state.movementAxis        

        let estX = Math.floor(event.clientX - rect.left)            
        let estY = Math.floor(event.clientY - rect.top)

        if (movementAxis == 'x') {
            if (estX >= 128) { estX = 255} else { estX = 0 }
        } else if (movementAxis == 'y') {
            if (estY >= 128) { estY = 255} else { estY = 0 }
        }
    
        return { x: estX, y: estY }

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