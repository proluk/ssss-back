import React, { Component } from 'react';
import {MdCloudDone, MdCloudOff} from 'react-icons/lib/md';

class SocketStatus extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const status = this.props.socketStatus;
        return (
            <div>
                {status ? <MdCloudDone /> : <MdCloudOff />}
            </div>
        )
    }
}


export default SocketStatus;   

