import React, { Component } from 'react';
import CanvasSection from './containers/CanvasSection'

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

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

        // fetch('/users')
        //     .then(res => res.json())
        //     .then(json => console.log(json));

        socket.onopen = (e) => {
            console.log("on open")
        }

        socket.onmessage = (e) => {
            console.log("on message, now update with data")
        }

    }

    handleMessage(e) {

        console.log("here")

    }

    render() {
        return (
            <div className="App">
                <CanvasSection socket={socket}/>
            </div>
        );
    }
}

export default App