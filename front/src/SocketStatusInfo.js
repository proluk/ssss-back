import React, { Component } from 'react';
import './SocketStatusInfo.css';

class SocketStatusInfo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const status = this.props.socketStatus;
        return (
            <div className="socket-status-info">
                { status ? "Connected to Node server" : "Not connected to Node" }
            </div>
        )
    }
}


export default SocketStatusInfo;   

