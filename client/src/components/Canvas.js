import React, {Component} from 'react'

class Canvas extends Component {

    constructor(props) {
        super(props)
        this.setSrc = this.setSrc.bind(this)
    }

    componentDidMount() {
        this.setSrc()
    }

    componentDidUpdate() {
        this.setSrc()
    }

    setSrc() {

        const {canvasData} = this.props        

        if (canvasData.Src) {
    
            const cx = this.canvas.getContext('2d')
    
            var img = new Image()
            img.onload = () => {
                cx.drawImage(img,0,0);                
            }

            img.src = canvasData.Src
                    
        }
    }

    render() {

        const {id, width, height, style, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onMouseEnter} = this.props

        return (
            <canvas 
                id={id}
                ref={(ele) => this.canvas = ele}
                width={width}
                height={height}
                style={style}
                onMouseDown={(e) => onMouseDown(e, id)}
                onMouseMove={(e) => onMouseMove(e, id)}
                onMouseUp={(e) => onMouseUp(e, id)}
                onMouseLeave={(e) => onMouseLeave(e, id)}
                onMouseEnter={(e) => onMouseEnter(e, id)}
                >
            </canvas>
        )

    }

}

export default Canvas
