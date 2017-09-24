import React, { Component } from 'react';
import CanvasSection from './containers/CanvasSection'

const socket = new WebSocket('ws://localhost:3001')

class App extends Component {

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

            socket.send(JSON.stringify({
                'hi': 'hello'
            }))

        }

        socket.onmessage = (e) => {
            console.log("on message")
            console.log(e.data)
        }

    }

    handleMessage(e) {

        console.log("here")

    }

    render() {
        return (
            <div className="App">
                <CanvasSection/>
            </div>
        );
    }
}

export default App