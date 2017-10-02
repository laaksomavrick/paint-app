import React from 'react'
import Canvas from './Canvas'

export const CanvasGrid = ({ canvasGrid, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onMouseEnter }) => (

    <div className="container">
        {
            canvasGrid.map((canvas, index) => (
                <Canvas 
                    key={index}
                    id={index}
                    canvasData={canvas}
                    width='250'
                    height='250'
                    style={{'border-bottom': '1px solid #000000'}}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    />
                )
            )
        }
    </div>

)