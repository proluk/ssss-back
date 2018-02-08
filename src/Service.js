import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MdAccessTime, MdCloudCircle} from 'react-icons/lib/md';
import './Service.css';

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false,
            serviceName : this.props.serviceName,
            service : this.props.serviceId,
            status: '',
            timestamp: ''
        }
    }

    componentDidMount() {
        this.props.socket.on('updateStatus', (data) => {
            data.service === this.state.service ? this.updateStatus(data) : this.process();
        });
        this.props.socket.on('setCurrentState', (data) => {
            data.services[this.state.service] !== undefined ? this.setCurrentState(data.services[this.state.service]) : this.process();
        });
        this.props.socket.on('disconnect', (data) => {
            data.service === this.state.service ? this.disconnected(data) : this.process();
        });
    }
    disconnected(data){
        this.setState({
            serviceName: this.props.serviceName,
            status: 'disconnected',
            timestamp: 'disconnected'
        });
    }
    process(){
        //recieved socket call but it was not for this service
    }
    updateStatus(data){
        this.setState({
            serviceName: this.props.serviceName,
            status: data.status.toString(),
            timestamp: data.timestamp
        });
    }
    setCurrentState(data){
        this.setState({
            status: data.status.toString(),
            timestamp: data.timestamp
        });
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
    render(){
        const date = this.state.timestamp.split('T');
        const color = this.state.status == '200' ? 'green' : 'red';
        const bgColor = this.state.status == '200' ? 'bggreen' : 'bgred';
        const visible = this.state.mouseOver ? 'show' : 'hide';
        return (
            <div className="ServiceBlock">
                <div className="ServiceBlock-title">
                    {this.state.serviceName}
                </div>
                <div className={"ServiceBlock-status "+ color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <MdCloudCircle className="Time"/>
                    <div className={"ServiceBlock-status-more "+visible+" "+bgColor}>
                        Status<br/>{this.state.status}
                    </div>
                </div>

                <div className="ServiceBlock-time">
                    <MdAccessTime className="Time"/> {date[0]} : {date[1]}
                </div>

            </div>
        );
    }
}

Service.contextTypes = {
    socket: PropTypes.object.isRequired,
}

export default Service;   

