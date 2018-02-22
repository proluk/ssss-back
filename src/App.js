import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SocketProvider from './SocketProvider';
import Service from './Service';
import socket from 'socket.io-client';
import SocketStatus from './SocketStatus';
import SocketStatusInfo from './SocketStatusInfo';
import {MdPerson} from 'react-icons/lib/md';
import './App.css';

class App extends Component {
  constructor(props, context){
    super(props);
    this.title = "System Sprawdzający Stan Serwisów";
    this.state = {
      socketConnection: false,
      mouseOver: false,
      sockets: 0,
      services: []
    };

    this.socket = socket('http://localhost:3000');
  }
  componentDidMount() {
    this.socket.on('updateSockectsNumber', (data) => {
      this.setState({
        sockets: data.sockets
      });
    });
    this.socket.on('connect', () => {
      this.setState({
        socketConnection: true
      });
    });
    this.socket.on('disconnect', () => {
      this.setState({
        socketConnection: false
      });
    });
    this.socket.on('servicelist', (services) => {
      console.log(services);
      this.setState({
        services: services
      });
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
  getChildContext() {
    return {
      socket: this.socket
    };
  }
  render() {
    const socketConnection = this.state.socketConnection;
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">S<sup>4</sup></span>
          <div className="App-socket-status" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
            <SocketStatus socketStatus={socketConnection}  />
            { this.state.mouseOver ? <SocketStatusInfo socketStatus={socketConnection}/> : "" } 
          </div>
          <span className="App-connected-clients">
            <MdPerson />{this.state.sockets}
          </span>
        </header>
        {this.state.services.map((elem, index)=>{
          return (
            <SocketProvider>
              <Service serviceName={elem.name} serviceId={elem.id}/>
            </SocketProvider>
          );
        })}
      </div>
    );
  }
}

App.childContextTypes = {
  socket: PropTypes.object.isRequired
};

export default App;
