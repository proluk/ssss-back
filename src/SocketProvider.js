import React, { Component } from "react";
import PropTypes from 'prop-types';

class SocketProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.socket = context.socket;
  }

  render() {
    return (
      <span>
        {React.cloneElement(this.props.children, {
          ...this.props,
          ...{ socket: this.socket }
        })}
      </span>
    );
  }
}

SocketProvider.contextTypes = {
  socket: PropTypes.object.isRequired
};

export default SocketProvider;