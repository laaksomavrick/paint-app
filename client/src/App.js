import React, { Component } from 'react';
import CanvasGridContainer from './containers/CanvasGridContainer'

const socket = new WebSocket('ws://localhost:3001')

class App extends Component {

    //register clients in ws
    //send draw events across ws
    //save canvas state in server (archive)
    //get canvas state on join

    //canvas grid, good time for redux perhaps 

    //App
    //GridContainer (state for all canvas in obj)
    //Grid
    //CanvasSectionContainer
    //CanvasSection

    //Tools (affect conf of drawing, toggle draw vs drag mode)

    render() {
        return (
            <div className="App">
                <CanvasGridContainer socket={socket}/>
            </div>
        );
    }
}

export default App