import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SocketProvider from './SocketProvider';
import Service from './Service';
// eslint-disable-next-line
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
      sockets: 0
    };

    this.socket = socket('http://localhost:8082');
  }
  componentDidMount() {
    this.socket.on('updateSockectsNumber', (data) => {
      this.setState({
        sockets: data.sockets
      });
    })
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
        <SocketProvider>
          <Service serviceName="profimatura.pl" serviceId="profimatura"/>
        </SocketProvider>
        <SocketProvider>
          <Service serviceName="profi-lingua.pl" serviceId="profilingua"/>
        </SocketProvider>
        <SocketProvider>
          <Service serviceName="disneyenglishkursy.pl" serviceId="disneyenglishkursy"/>
        </SocketProvider>
        <SocketProvider>
          <Service serviceName="empikschool.com" serviceId="empikschool"/>
        </SocketProvider>
        <SocketProvider>
          <Service serviceName="zdasz.to" serviceId="zdaszto"/>
        </SocketProvider>
      </div>
    );
  }
}

App.childContextTypes = {
  socket: PropTypes.object.isRequired
};

export default App;
