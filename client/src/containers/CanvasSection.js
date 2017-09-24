import React, { Component } from 'react';

class CanvasSection extends Component {
    state = {}

    componentDidMount() {
    }

    render() {
        return (
            <canvas 
                width="500" 
                height="500" 
                style={{'border': '1px solid #000000'}}>
            </canvas>
        );
    }

}

export default CanvasSection;