import React, { Component } from 'react';
import CanvasSection from './containers/CanvasSection'

class App extends Component {

    state = {}

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(json => console.log(json));
    }

    render() {
        return (
            <div className="App">
                <CanvasSection/>
            </div>
        );
    }
}

export default App;