import React, { Component } from 'react';
import CanvasGridContainer from './containers/CanvasGridContainer'

const socket = new WebSocket('ws://localhost:3001')

class App extends Component {

   constructor(props) {
       super(props)
       this.state = {
           mode: 'scroll' //scroll or draw
       }
   }

    render() {

        const mode = this.state.mode

        return (
            <div className="App">
                <CanvasGridContainer socket={socket} mode={mode}/>
            </div>
        );
    }
}

export default App