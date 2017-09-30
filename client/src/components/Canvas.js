import React from 'react'

export const Canvas = ({id, width, height, style, onMouseDown, onMouseMove, onMouseUp}) => (

    <canvas 
        id={id}
        width={width}
        height={height}
        style={style}
        onMouseDown={(e) => onMouseDown(e, id)}
        onMouseMove={(e) => onMouseMove(e, id)}
        onMouseUp={(e) => onMouseUp(e, id)}
        >
    </canvas>

)
