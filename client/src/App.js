import React, { Component } from 'react';
import './App.css';

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
            </div>
        );
    }
}

export default App;