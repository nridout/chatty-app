import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message />')
    // *** Think about how to "turn off" the username div when its a system message
    // *** Need to do the same for photos
    // if this.props.message.type, show this? else hide?
    const messageType = this.props.message.type
    const isImage = this.props.message.image
    return (
      <div className={messageType}>
        <span className={messageType + '-username'} style={{color: this.props.message.color}}>{this.props.message.username}</span>
        <span className={isImage? ('hide') : (messageType + '-content')}>{this.props.message.content}</span>
        <img className={isImage ? 'image' : 'hide'} src={this.props.message.content} />
      </div>
    );
  }
}

export default Message;
