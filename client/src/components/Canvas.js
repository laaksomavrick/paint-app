import React from 'react'

export const Canvas = ({id, width, height, style, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onMouseEnter}) => (

    <canvas 
        id={id}
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
