import React from 'react'

export const Canvas = ({id, canvasData, width, height, style, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onMouseEnter}) => {

    if (canvasData.src) {
        
    }

    return (
        <canvas 
            id={id}
            ref={(canvas) => this.canvas = canvas}
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
