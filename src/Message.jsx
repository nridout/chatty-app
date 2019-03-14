import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message />')
    // *** Think about how to "turn off" the username div when its a system message
    return (
      <div className={this.props.message.type}>
        <span className={this.props.message.type + '-username'}>{this.props.message.username}</span>
        <span className={this.props.message.type + '-content'}>{this.props.message.content}</span>
      </div>
    );
  }
}

export default Message;
