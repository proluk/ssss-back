import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MdAccessTime, MdCloudCircle} from 'react-icons/lib/md';
import './Service.css';

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false,
            serviceName : this.props.name,
            serviceId : this.props.id,
            serviceTime : this.props.timestamp,
            serviceUrl : this.props.url,
            serviceStatus : this.props.status,
            serviceOrder : this.props.order
        }
    }

    componentDidMount() {
        this.props.socket.on('updateStatus', (data) => {
            data.service === this.state.service ? this.updateStatus(data) : this.process();
        });
        // this.props.socket.on('setCurrentState', (data) => {
        //     data.services[this.state.service] !== undefined ? this.setCurrentState(data.services[this.state.service]) : this.process();
        // });
        this.props.socket.on('disconnect', (data) => {
            data.service === this.state.service ? this.disconnected(data) : this.process();
        });
    }
    disconnected(data){
        this.setState({
            serviceName: this.props.name,
            serviceStatus: 'disconnected',
            serviceTime: 'disconnected'
        });
    }
    process(){
        //recieved socket call but it was not for this service
    }
    updateStatus(data){
        this.setState({
            serviceStatus: data.status,
            serviceTime: data.timestamp
        });
    }
    // setCurrentState(data){
    //     this.setState({
    //         status: data.status,
    //         timestamp: data.timestamp
    //     });
    // }
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
        const color = this.state.serviceStatus == '200' ? 'green' : 'red';
        const bgColor = this.state.serviceStatus == '200' ? 'bggreen' : 'bgred';
        const visible = this.state.mouseOver ? 'show' : 'hide';
        const status = this.state.serviceStatus.code != undefined ? this.state.serviceStatus.code : this.state.serviceStatus;
        return (
            <div className="ServiceBlock" style={{order:this.state.serviceOrder}}>
                <div className="ServiceBlock-title">
                    {this.state.serviceName}
                </div>
                <div className={"ServiceBlock-status "+ color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <MdCloudCircle className="Time"/>
                    <div className={"ServiceBlock-status-more "+visible+" "+bgColor}>
                        Status<br/>{status}
                    </div>
                </div>

                <div className="ServiceBlock-time">
                    <MdAccessTime className="Time"/> {new Date(this.state.serviceTime).toLocaleString()}
                </div>

            </div>
        );
    }
}

Service.contextTypes = {
    socket: PropTypes.object.isRequired,
}

export default Service;   

