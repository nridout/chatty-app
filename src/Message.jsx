import React, { Component } from 'react';

// Message component handles incoming message types & what to display,
// depending on whether the type is message or notification,
// and if the message contains a text message, an image, or both
class Message extends Component {
  render() {
    const messageType = this.props.message.type
    const image = this.props.message.image
    const messageContent = this.props.message.content
    return (
      <div className={messageType}>
        <span className={messageType + '-username'} style={ {color: this.props.message.color} }>{this.props.message.username}</span>
        <div className="message-group">
          { messageContent ? <span className={messageType + '-content'}> {messageContent} </span> : null }
          { messageContent && image ? <br></br> : null }
          { image ? <img className="image" src={image} /> : null }
        </div>
      </div>
    );
  }
}

export default Message;
