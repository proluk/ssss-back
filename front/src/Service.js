import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MdAccessTime, MdCloudCircle, MdSettings} from 'react-icons/lib/md';
import './Service.css';

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false,
            settingsOpen: false,
            serviceName : this.props.name,
            serviceId : this.props.id,
            serviceTime : this.props.timestamp,
            serviceUrl : this.props.url,
            serviceStatus : this.props.status,
            serviceOrder : this.props.order
        }
    }
    process(){
        //recieved socket call but it was not for this service
    }
    mouseEnter = () => {
        this.setState({
            mouseOver: true
        });
    }
    mouseLeave = () => {
        this.setState({
            mouseOver: false
        });
    }
    showServiceSettings = () => {
        this.setState({
            
        })
    }
    render(){
        const color = this.props.status == '200' ? 'green' : 'red';
        const bgColor = this.props.status == '200' ? 'bggreen' : 'bgred';
        const visible = this.state.mouseOver ? 'show' : 'hide';
        return (
            <div className="ServiceBlock" data-key={this.state.serviceId}>
                <div className="ServiceBlock-title">
                    {this.state.serviceName}
                </div>
                <div className={"ServiceBlock-status "+ color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <MdCloudCircle className="Time"/>
                    <div className={"ServiceBlock-status-more "+visible+" "+bgColor}>
                        Status<br/>{this.props.status}
                    </div>
                </div>
                <div className="ServiceBlock-settings" onClick={this.showServiceSettings}>
                    <MdSettings />
                </div>
                <div className="ServiceBlock-time">
                    <MdAccessTime className="Time"/> {new Date(this.props.timestamp).toLocaleString()}
                </div>
                {/* <div className="ServiceBlockSettings-container">
                    <div className={"ServiceBlockSettings-content "+this.state.settingsOpen}>
                        <div className="ServiceBlockSettings-exit">x</div>
                    </div>
                </div> */}
            </div>
        );
    }
}

Service.contextTypes = {
    socket: PropTypes.object.isRequired,
}

export default Service;   

