import React, { Component } from 'react'
import httpService from '../../axios/httpService'
import './index.css'
// import Board from './Board';
// import MouseMove from '../renderProps/MouseMove';

class CurrentChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        httpService.getUserInfo({
            sessionId: "066aa03b852b551987003e6375cd5f16857998ba996585f3340629fc8",
            userId: "517702017062615000768003"
        }).then(function(res) {

        })
    }

    render() {
        return (
            <div className="channel">
                活期频道
            </div>
        )
    }
}

export default CurrentChannel;
