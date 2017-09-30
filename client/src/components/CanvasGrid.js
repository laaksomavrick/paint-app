import React from 'react'
import { Canvas } from './Canvas'

export const CanvasGrid = ({ canvasGrid, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onMouseEnter }) => (

    <div>
        {
            canvasGrid.map((canvas, index) => (
                <Canvas 
                    key={index}
                    id={index}
                    width='250'
                    height='250'
                    style={{'border': '1px solid #000000'}}
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